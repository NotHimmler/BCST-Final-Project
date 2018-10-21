//
//  LoginView.swift
//  WalkAroundTheBlock
//
//  Created by Heinrich Malan on 17/10/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import UIKit
import CoreData

class LoginView: UIViewController {

    //MARK: Properties
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addDoneButtonOnKeyboard()
        // Do any additional setup after loading the view.
    }
    
    func addDoneButtonOnKeyboard() {
        let doneToolbar: UIToolbar = UIToolbar(frame: CGRect(x: 0, y: 0, width: 320, height: 50))
        doneToolbar.barStyle       = UIBarStyle.default
        let flexSpace              = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.flexibleSpace, target: nil, action: nil)
        let done: UIBarButtonItem  = UIBarButtonItem(title: "Done", style: UIBarButtonItemStyle.done, target: self, action: #selector(LoginView.doneButtonAction))
        
        var items = [UIBarButtonItem]()
        items.append(flexSpace)
        items.append(done)
        
        doneToolbar.items = items
        doneToolbar.sizeToFit()
        
        self.usernameTextField.inputAccessoryView = doneToolbar
        self.passwordTextField.inputAccessoryView = doneToolbar
        self.lastNameTextField.inputAccessoryView = doneToolbar
    }
    
    @objc func doneButtonAction() {
        self.usernameTextField.resignFirstResponder()
        self.passwordTextField.resignFirstResponder()
        self.lastNameTextField.resignFirstResponder()
    }
    
    @IBAction func loginHandler(_ sender: Any) {
        if usernameTextField.text == "" || passwordTextField.text == "" ||
            lastNameTextField.text == "" {
            return
        }
        //declare parameter as a dictionary which contains string as key and value combination.
        let parameters = ["userInfo": ["mrn": usernameTextField.text, "firstName": passwordTextField.text, "lastName": lastNameTextField.text]]
        
        //create the url with NSURL
        let url = NSURL(string: WalkSyncing.loginString)
        
        //create the session object
        let session = URLSession.shared
        
        //now create the NSMutableRequest object using the url object
        let request = NSMutableURLRequest(url: url! as URL)
        request.httpMethod = "POST" //set http method as POST
        let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        let context = appDelegate.persistentContainer.viewContext
        let entity = NSEntityDescription.entity(forEntityName: "UserInfo", in: context)!
        let alertController = UIAlertController(title: "Login Error!", message: "Wrong User Name or Password.", preferredStyle: UIAlertControllerStyle.alert)
        
        alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted) // pass dictionary to nsdata object and set it as request body
            
        } catch let error {
            print(error.localizedDescription)
        }
        
        //HTTP Headers
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        var failed = false;
        var finished = false;
        //create dataTask using the session object to send data to the server
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            guard error == nil else {
                return
            }
            
            guard let data = data else {
                return
            }
            
            do {
                //create json object from data
                if let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: AnyObject] {
                    print(json)
                    // handle json...
                    if json["error"] == nil {
                        let token = json["MRN"]
                        
                        let newUserInfo = NSManagedObject(entity: entity, insertInto: context)
                        newUserInfo.setValue(token, forKey: "token")
                        newUserInfo.setValue(json["first_name"], forKey: "firstName")
                        newUserInfo.setValue(json["last_name"], forKey: "lastName")
                        do {
                            try context.save()
                            finished = true
                        } catch {
                            print("Failed saving")
                        }
                    } else {
                        failed = true
                        finished = true
                    }
                    
                }
                
            } catch let error {
                finished = true
                print(error.localizedDescription)
            }
            
        })
        
        task.resume()
        while !finished {}
        if(failed) {
            self.present(alertController, animated: true, completion: nil)
        }
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func cancelHandler(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
