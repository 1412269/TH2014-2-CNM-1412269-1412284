//
//  ViewController.swift
//  TutorialGoogleMapsAnDirection
//
//  Created by Bùi Minh Tiến on 3/26/17.
//  Copyright © 2017 TienBM. All rights reserved.
//

import UIKit
import GoogleMaps
import FirebaseDatabase

class ViewController: UIViewController {
    
    
    @IBAction func btnLoginClick(_ sender: UIButton) {
        
        let login = LoginViewController(nibName: "LoginViewController", bundle: nil)
        self.present(login, animated: true, completion: nil)
    }
    
   
    override func viewDidLoad() {
        super.viewDidLoad()
       
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
 
