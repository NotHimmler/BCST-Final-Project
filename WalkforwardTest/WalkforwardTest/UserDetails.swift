//
//  UserDetails.swift
//  WalkAroundTheBlock
//
//  Created by Heinrich Malan on 17/10/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import UIKit
import CoreData

class UserDetails: UIViewController {
    var firstName: String = ""
    var lastName: String = ""
    //MARK: Properties
    @IBOutlet weak var loginButton: UIButton!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        let context = appDelegate.persistentContainer.viewContext
        
        let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "UserInfo")
        var result: [NSManagedObject]?
        do {
            result = try context.fetch(fetchRequest)
            if result!.count == 1 {
                context.delete(result![0])
                /**
                let userInfo = result![0]
                firstName = userInfo.value(forKey: "firstName") as! String
                lastName = userInfo.value(forKey: "lastName") as! String
                loginButton.isHidden = true
                **/        
            }
        } catch let error as NSError {
            print("Could not fetch. \(error), \(error.userInfo)")
        }
        // Do any additional setup after loading the view.
    }
    
    @IBAction func handleLoginButton(_ sender: Any) {
        performSegue(withIdentifier: "loginSegue", sender: self)
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
