//
//  LoginViewController.swift
//  LogInAndSignUp
//
//  Created by liem on 12/14/17.
//  Copyright © 2017 liem. All rights reserved.
//

import UIKit
import FirebaseAuth

class LoginViewController: UIViewController {
    //Outlets
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //Login Action
    @IBAction func loginAction(_ sender: UIButton) {
        Auth.auth().signIn(withEmail: emailTextField.text!,password: passwordTextField.text!) { user, error in
            if error == nil
            {
                if (Auth.auth().currentUser?.isEmailVerified)!
                {
                    //create register message
                    let alert = UIAlertController(title: "Đăng nhập thành công", message: "Nhập ID tài xế", preferredStyle: .alert)
                    //create save button and action
                    let saveAction = UIAlertAction(title: "Save", style: .destructive) { action in
                        //get text from message
                        let IDDriver = alert.textFields![0]
                        let Grab = GrabBikeViewController(nibName:"GrabBikeViewController", bundle: nil)
                                            Grab.title = "app Driver"
                            Grab.ID = Int(IDDriver.text!)!
                                            //UINavigationController *navi = [[UINavigationController alloc] initWithRootViewController:lt];
                                            //letnavigationController = UINavigationController(rootViewController: login)
                         self.present(Grab, animated: true, completion: nil)
                        //self.navigationController?.pushViewController(Grab, animated: true)
                    }
                    //create cancel button and action
                    let cancelAction = UIAlertAction(title: "Cancel",style: .default){ action in
                        alert.title = "Bắt buộc nhập ID tài xế"
                         self.present(alert, animated: true, completion: nil)
                        
                    }
                    
                    //add text to message
                    alert.addTextField { textEmail in
                        textEmail.placeholder = "Enter your ID"
                    }
                    //add action to message
                    alert.addAction(saveAction)
                    alert.addAction(cancelAction)
                    
                    //show
                    self.present(alert, animated: true, completion: nil)
                    
                    //                    let Grab = GrabBikeViewController(nibName:"GrabBikeViewController", bundle: nil)
                    //                    Grab.title = "app Driver"
                    //                    //UINavigationController *navi = [[UINavigationController alloc] initWithRootViewController:lt];
                    //                    //letnavigationController = UINavigationController(rootViewController: login)
                    //                    self.navigationController?.pushViewController(Grab, animated: true)
                    //                    //self.performSegue(withIdentifier: "LoginToPostSegue", sender: nil)
                    //                    self.showAlertMsg(title: "Đăng nhập", message: "Đăng nhập thành công")
                    //
                }
                else
                {
                    let alertController = UIAlertController(title: "Error", message: "Account not verified!", preferredStyle: .alert)
                    
                    let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
                    let verifyAction = UIAlertAction(title: "Verify", style: .default) { action in
                        
                        Auth.auth().currentUser?.sendEmailVerification { (error) in
                            if error != nil{
                                print(error!.localizedDescription)
                            }
                            else
                            {
                                let sentAlertController = UIAlertController(title: "", message: "A verification email has been sent to your email!", preferredStyle: .alert)
                                let okAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
                                sentAlertController.addAction(okAction)
                                self.present(sentAlertController, animated: true, completion: nil)
                            }
                        }
                        
                    }
                    alertController.addAction(verifyAction)
                    alertController.addAction(cancelAction)
                    
                    self.present(alertController, animated: true, completion: nil)
                }
            }
            else {
                
                //Tells the user that there is an error and then gets firebase to tell them the error
                let alertController = UIAlertController(title: "Error", message: error?.localizedDescription, preferredStyle: .alert)
                
                let defaultAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
                alertController.addAction(defaultAction)
                
                self.present(alertController, animated: true, completion: nil)
            }
        }
    }
    @IBAction func btnBackClick(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
