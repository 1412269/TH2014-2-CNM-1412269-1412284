//
//  GrabBikeViewController.swift
//  TutorialGoogleMapsAnDirection
//
//  Created by liem on 1/7/18.
//  Copyright © 2018 TienBM. All rights reserved.
//

import UIKit
import GoogleMaps
import FirebaseDatabase
import FirebaseAuth
import Alamofire
import SwiftyJSON
class GrabBikeViewController: UIViewController {
    
    @IBOutlet weak var detailDirection: UILabel!
     @IBOutlet weak var btnEnd: UIButton!
     @IBOutlet weak var btnStart: UIButton!
    @IBOutlet weak var mapView: GMSMapView!
    let locationManager = CLLocationManager()
    var originLatitude: Double = 10.773434
    var originLongtitude: Double = 106.683509
    var originLatitudeDefault:Double = 0
    var originLongtitudeDefault:Double = 0
    var destinationLatitude: Double = 10.775459
    var destinationLongtitude: Double = 106.681476
    var Checkclick: Int = 0
    var ID: Int = 20
    var checkBook:Int = 0
    var customer:Customer = Customer.init(key:"NO",address: "", driverNumber: 0, note: "", phoneNumber: "", state: "", vehicle: "")
    var car:Car = Car.init(key: "NO", id: -1, lat: 0, lng: 0, state: -1, type: "")
    var travelMode = TravelModes.driving
    let directionService = DirectionService()
    
    func getAddress(address:String){
        
        let key : String = "AIzaSyA4nXG1QZTiniS0J2mKF5swledjmb0_4oo"
        let postParameters:[String: Any] = [ "address": address,"key":key]
        let url : String = "https://maps.googleapis.com/maps/api/geocode/json"
        
        Alamofire.request(url, method: .get, parameters: postParameters, encoding: URLEncoding.default, headers: nil).responseJSON {  response in
            
            if let receivedResults = response.result.value
            {
                let resultParams = JSON(receivedResults)//receivedResults as! NSDictionary//
                print("ok ok \(resultParams)") // RESULT JSON
                print(resultParams["status"]) // OK, ERROR
                print(resultParams["results"][0]["geometry"]["location"]["lat"].doubleValue) // approximately latitude
                print(resultParams["results"][0]["geometry"]["location"]["lng"].doubleValue) // approximately longitude
                self.destinationLatitude = resultParams["results"][0]["geometry"]["location"]["lat"].doubleValue
                self.destinationLongtitude = resultParams["results"][0]["geometry"]["location"]["lng"].doubleValue
                let marker1 = GMSMarker(position: CLLocationCoordinate2D(latitude: self.destinationLatitude, longitude: self.destinationLongtitude))
                marker1.icon = UIImage(named:"iconCustomer-20.png")
                marker1.map = self.mapView
            }
        }
    }
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
       
        getDriver()
        getCustomer()
        self.btnStart.isHidden = true
        self.btnEnd.isHidden = true
    }
    var timer: Timer?
    
    func startTimer() {
        
        if timer == nil {
            timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(self.loop), userInfo: nil, repeats: true)
        }
    }
    
    func stopTimer() {
        if timer != nil {
            timer?.invalidate()
            timer = nil
        }
    }
    
    func loop() {
        
        if self.checkBook == 0 {
        updateBookList(state:"bị từ chối")
        self.customer.key = "NO"
        self.stopTimer()
        self.detailDirection.text = "Hiện tại không có khách"
        self.mapView.clear()
            let marker1 = GMSMarker(position: CLLocationCoordinate2D(latitude: self.originLatitudeDefault, longitude: self.originLongtitudeDefault))
            marker1.icon = UIImage(named:"bike-20.png")
            marker1.title = "Sydney"
            marker1.snippet = "Australia"
            //marker1.icon = UIImage(
            marker1.map = self.mapView
            let camera = GMSCameraPosition.camera(
                withLatitude: self.originLatitudeDefault,
                longitude: self.originLongtitudeDefault, zoom: zoomLevel)
            if self.mapView.isHidden {
                self.mapView.isHidden = false
                self.mapView.camera = camera
            } else {
                self.mapView.animate(to: camera)
            }
            
        }
    }
    func updateCar(state:Int) {
        var dbRef:DatabaseReference!
        dbRef = Database.database().reference().child("cars")
        print("..............ok..........")
        car.state = state
        let _car = ["ID":car.id,
                    "LocationCar":[
                        "lat": car.lat,
                        "lng": car.lng
                        ] as [String : Any],
                    "State": car.state,
                    "Type": car.type
            ] as [String : Any]
        
        //updating the artist using the key of the artist
        dbRef.child(car.key).setValue(_car)
    }
    func updateBookList(state:String) {
        if customer.key != "NO" && customer.driverNumber == ID {
            customer.state = state
            var dbBooklist:DatabaseReference!
            dbBooklist = Database.database().reference().child("book-list")
            print("..............ok..........")
            let book = ["address":customer.address,
                        "driverNumber": customer.driverNumber,
                        "note": customer.note,
                        "phoneNumber": customer.phoneNumber,
                        "state": customer.state,
                        "vehicle": customer.vehicle
                ] as [String : Any]
            
            //updating the artist using the key of the artist
            dbBooklist.child(customer.key).setValue(book)
            if state.isEqualToString(find: "bị từ chối") {
                self.checkBook = 0
               customer.key = "NO"
            }
        } else {
             print("..............NO..........")
        }
    }
    func getDriver() {
        var dbRef:DatabaseReference!
        dbRef = Database.database().reference().child("cars")
        dbRef.observe(DataEventType.value, with: { (snapshot) in
            for child in snapshot.children{
                let snap = child as! DataSnapshot
                let value = snap.value as? [String : AnyObject]
                if let idDriver = value?["ID"] as? Int {
                    if idDriver == self.ID {
                        let key = snap.key
                        let state = value?["State"] as? Int
                        let type = value?["Type"] as? String
                        print("key = \(key) and ID \(idDriver) and state \(state!) and type \(type!)")
                        if let data = value?["LocationCar"] as? [String : Double] {
                            print("location = \(data)")
                            let lat = data["lat"]
                            let lng = data["lng"]
                            self.originLatitude = lat!
                            self.originLongtitude = lng!
                            self.originLatitudeDefault = data["lat"]!
                            self.originLongtitudeDefault =  data["lng"]!
                            self.car.set(_key: key, _id: idDriver, _lat: self.originLatitudeDefault, _lng:  self.originLongtitudeDefault, _state: state!, _type: type!)
                            print("car =  \(self.car)")
                           
                            let camera = GMSCameraPosition.camera(
                                withLatitude: self.originLatitude,
                                longitude: self.originLongtitude, zoom: zoomLevel)
                            if self.mapView.isHidden {
                                self.mapView.isHidden = false
                                self.mapView.camera = camera
                            } else {
                                self.mapView.animate(to: camera)
                            }
                            let marker1 = GMSMarker(position: CLLocationCoordinate2D(latitude: self.originLatitude, longitude: self.originLongtitude))
                            marker1.icon = UIImage(named:"bike-20.png")
                            marker1.title = "Vị trí hiện tại của xe"
                            // marker1.snippet = "Australia"
                            //marker1.icon = UIImage(
                            marker1.map = self.mapView
                            self.mapView.selectedMarker = marker1
                        }
                    }else {
                        
                    }
                }else
                {
                }
            }
        })
    }
func  getCustomer() {
    
    var dbBooklist:DatabaseReference!
    dbBooklist = Database.database().reference().child("book-list")
    dbBooklist.observe(DataEventType.value, with: { (snapshot) in
    for child in snapshot.children{
    let snap = child as! DataSnapshot
    let value = snap.value as? [String : AnyObject]
    if let idDriver = value?["driverNumber"] as? Int {
    let state = value?["state"] as? String
        if idDriver == self.ID && (state?.isEqualToString(find: "đã định vị"))!{
        let address = value?["address"] as? String
        
        let note = value?["note"] as? String
        let phoneNumber = value?["phoneNumber"] as? String
        let vehicle = value?["vehicle"] as? String
        let key = snap.key
        self.customer.set(_key: key, _address: address!, _driverNumber: idDriver, _note: note!, _phoneNumber: phoneNumber!, _state: state!, _vehicle: vehicle!)
        print("vehicle = \(key) address \(String(describing: address))")
        print("customer =  \(self.customer)")
        self.getAddress(address:address!)
        //if self.checkBook == 0 {
            self.detailDirection.text = "Khách đang chờ xác nhận"
            self.startTimer()
        //}
        } else {
        //if self.car.state == 0 {
           // self.detailDirection.text = "Hiện tại không có khách"
       //}
        }
        
        }
    }
    })
    }
    fileprivate func direction() {
        if(customer.key != "NO" ){
            self.mapView.clear()
            let origin: String = "\(originLatitude),\(originLongtitude)"
            let destination: String =
            "\(destinationLatitude),\(destinationLongtitude)"
            let marker = GMSMarker(position: CLLocationCoordinate2D(latitude: destinationLatitude, longitude: destinationLongtitude))
            marker.icon = UIImage(named:"iconCustomer-20.png")
            marker.map = self.mapView
            let marker1 = GMSMarker(position: CLLocationCoordinate2D(latitude: originLatitude, longitude: originLongtitude))
            marker1.icon = UIImage(named:"bike-20.png")
            //marker1.icon = UIImage(
            marker1.map = self.mapView
            self.directionService.getDirections(origin: origin,
                                                destination: destination,
                                                travelMode: travelMode) { [weak self] (success) in
                                                    if success {
                                                        DispatchQueue.main.async {
                                                            self?.drawRoute()
                                                            if let totalDistance = self?.directionService.totalDistance,
                                                                let totalDuration = self?.directionService.totalDuration {
                                                                self?.detailDirection.text = totalDistance + ". " + totalDuration
                                                                if self?.Checkclick == 1{
                                                                    self?.Checkclick = 0
                                                                    let str = self?.detailDirection.text
                                                                    self?.detailDirection.text = str! + "\n Bạn đang ở trạng thái xem đường đi"
                                                                }
                                                                self?.detailDirection.isHidden = false
                                                            }
                                                        }
                                                    } else {
                                                        print("error direction")
                                                    }
            }
            
        }
    }
    
    fileprivate func drawRoute() {
        for step in self.directionService.selectSteps {
            if step.polyline.points != "" {
                
                let path = GMSPath(fromEncodedPath: step.polyline.points)
                let routePolyline = GMSPolyline(path: path)
                routePolyline.strokeColor = UIColor.blue
                routePolyline.strokeWidth = 3.0
                routePolyline.map = mapView
            } else {
                return
            }
        }
    }
    
    @IBAction func walking(_ sender: Any) {
        if customer.key != "NO"{
            let alert = UIAlertController(title: "Tuỳ chọn", message: "Bạn có chở khách không?", preferredStyle: UIAlertControllerStyle.alert)
            let btnyes:UIAlertAction = UIAlertAction(title: "Nhận khách", style: UIAlertActionStyle.destructive) {
                (btn) in
                self.stopTimer()
                self.updateBookList(state:"đã có xe nhận")
                self.checkBook = 1
                self.updateCar(state:1)
                self.btnStart.isHidden = false
                self.travelMode = TravelModes.bicycling
                self.direction()
                self.afterDirection()
               
            }
            let btnHuy:UIAlertAction = UIAlertAction(title: "Huỷ", style: UIAlertActionStyle.cancel) {
                (btn) in
                self.checkBook = 0
                self.startTimer()
                 self.updateBookList(state:"bị từ chối")
            }
            //alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
            alert.addAction(btnyes)
           // alert.addAction(btnDeail)
            alert.addAction(btnHuy)
            present(alert, animated: true, completion: nil)
        } else{
            let _alert = UIAlertController(title: "Thông báo", message: "Hiện tại không có khách chờ", preferredStyle: UIAlertControllerStyle.alert)
            let btnOK:UIAlertAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.cancel) {
                (btn) in
                self.checkBook = 0
            }
            _alert.addAction(btnOK)
            present(_alert, animated: true, completion: nil)
        }
    }
     @IBAction func btnStartClick(_ sender: Any) {
        self.mapView.delegate = self
        self.btnStart.isHidden = true
        self.btnEnd.isHidden = false
    }
     @IBAction func btnEndClick(_ sender: Any) {
      self.checkBook = 0
      self.updateBookList(state:"đã hoàn thành")
      self.customer.key = "NO"
        self.updateCar(state:0)
         self.mapView.delegate = nil
//        let camera = GMSCameraPosition.camera(withLatitude:originLatitude, longitude: originLongtitude, zoom: zoomLevel)
//        let map = GMSMapView.map(withFrame: .zero, camera: camera)
//            map.clear()
        self.mapView.clear()
        let marker1 = GMSMarker(position: CLLocationCoordinate2D(latitude: originLatitudeDefault, longitude: originLongtitudeDefault))
        marker1.icon = UIImage(named:"bike-20.png")
        marker1.map = self.mapView
        originLatitude = originLatitudeDefault
        originLongtitude = originLongtitudeDefault
        let camera = GMSCameraPosition.camera(
            withLatitude: self.originLatitudeDefault,
            longitude: self.originLongtitudeDefault, zoom: zoomLevel)
        if self.mapView.isHidden {
            self.mapView.isHidden = false
            self.mapView.camera = camera
        } else {
            self.mapView.animate(to: camera)
        }
        self.detailDirection.text = "Hiện tại không có khách"
        self.btnEnd.isHidden  = true
        self.btnStart.isHidden = true
        //self.detailDirection.text = "";
       // self.detailDirection.isHidden = true
    }
    
    @IBAction func btnLogOutClick(_ sender: UIButton) {
        let alert = UIAlertController(title: "LogOut", message: "Bạn có chắc chắn đăng xuất?", preferredStyle: UIAlertControllerStyle.alert)
        let btnyes:UIAlertAction = UIAlertAction(title: "LogOut", style: UIAlertActionStyle.destructive) {
            (btn) in
            let firebaseAuth = Auth.auth()
            do {
                try firebaseAuth.signOut()
                self.dismiss(animated: true, completion: nil)
            } catch let signOutError as NSError {
                print ("Error signing out: %@", signOutError)
            }
           
            
        }
        let btnHuy:UIAlertAction = UIAlertAction(title: "Huỷ", style: UIAlertActionStyle.cancel) {
            (btn) in
        }
        //alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
        alert.addAction(btnyes)
        // alert.addAction(btnDeail)
        alert.addAction(btnHuy)
        present(alert, animated: true, completion: nil)
        
    }
    
    
    @IBAction func bicycling(_ sender: Any) {
        self.travelMode = TravelModes.bicycling
        self.direction()
        self.afterDirection()
    }
    
    @IBAction func driving(_ sender: Any) {
        self.travelMode = TravelModes.driving
        self.direction()
        self.afterDirection()
    }
    
    @IBAction func transit(_ sender: Any) {
        self.travelMode = TravelModes.transit
        self.direction()
        self.afterDirection()
    }
    
    fileprivate func afterDirection() {
        self.directionService.totalDistanceInMeters = 0
        self.directionService.totalDurationInSeconds = 0
        self.directionService.selectLegs.removeAll()
        self.directionService.selectSteps.removeAll()
    }
    
}

extension GrabBikeViewController: CLLocationManagerDelegate {
    //Handle incoming location events.
    func locationManager(_ manager: CLLocationManager,
                         didUpdateLocations locations: [CLLocation]) {
        manager.stopUpdatingLocation()
        if let location: CLLocation = locations.last {
            let locationLatitude = 10.773434//location.coordinate.latitude
            let locationLongtitude =  106.683509//location.coordinate.longitude
            self.originLatitude = locationLatitude
            self.originLongtitude = locationLongtitude
            let camera = GMSCameraPosition.camera(
                withLatitude: locationLatitude,
                longitude: locationLongtitude, zoom: zoomLevel)
            if mapView.isHidden {
                mapView.isHidden = false
                mapView.camera = camera
            } else {
                mapView.animate(to: camera)
            }
        }
    }
    
    // Handle authorization for the location manager.
    func locationManager(_ manager: CLLocationManager,
                         didChangeAuthorization status: CLAuthorizationStatus) {
        if status == .authorizedWhenInUse {
            manager.startUpdatingLocation()
        }
    }
    
    // Handle location manager errors.
    func locationManager(_ manager: CLLocationManager,
                         didFailWithError error: Error) {
        locationManager.stopUpdatingLocation()
        print("Error: \(error)")
    }
}

extension GrabBikeViewController: GMSMapViewDelegate {
    
    func mapView(_ mapView: GMSMapView, didLongPressAt coordinate: CLLocationCoordinate2D) {
        self.originLatitude = coordinate.latitude
        self.originLongtitude = coordinate.longitude
        //let marker = GMSMarker(position: coordinate)
       // marker.map = self.mapView
        self.travelMode = TravelModes.bicycling
        self.direction()
        self.afterDirection()
        
    }
}
struct Car {
    var key: String
    var id: Int
    var lat:Double
    var lng:Double
    var state:Int
    var type:String
    
    init(key: String,id: Int,lat:Double,lng:Double,state:Int,type:String){
        self.key = key
        self.id = id
        self.lat = lat
        self.lng = lng
        self.state = state
        self.type = type
        
    }
    mutating func set(_key: String,_id: Int,_lat:Double,_lng:Double,_state:Int,_type:String){
        key = _key
        id = _id
        lat = _lat
        lng = _lng
        state = _state
        type = _type
        
    }
}
struct Customer{
    var key: String
    var address: String
    var driverNumber: Int
    var note:String
    var phoneNumber:String
    var state:String
    var vehicle:String
    init(key: String,address: String, driverNumber: Int,note:String,phoneNumber:String,state:String,vehicle:String) { //3
        self.key = key
        self.address = address
        self.driverNumber = driverNumber
        self.note = note
        self.phoneNumber = phoneNumber
        self.state = state
        self.vehicle = vehicle
    }
    mutating func set(_key: String,_address: String, _driverNumber: Int,_note: String,_phoneNumber: String,_state: String,_vehicle: String) { //3
        key = _key
        address = _address
        driverNumber = _driverNumber
        note = _note
        phoneNumber = _phoneNumber
        state = _state
        vehicle = _vehicle
    }
}
extension String {
    func isEqualToString(find: String) -> Bool {
        return String(format: self) == find
    }
}



