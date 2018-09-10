//
//  HistoryViewController.swift
//  WalkforwardTest
//
//  Created by Heinrich Malan on 6/9/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import UIKit
import CoreLocation
import CoreData

class HistoryViewController: UIViewController, CLLocationManagerDelegate {
    
    var appDelegate: AppDelegate?
    var context: NSManagedObjectContext?
    var entity: NSEntityDescription?
    // MARK: Properties
    
    @IBOutlet weak var TextLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        context = appDelegate!.persistentContainer.viewContext
        entity = NSEntityDescription.entity(forEntityName: "Walk", in: context!)!
        let request = NSFetchRequest<NSFetchRequestResult>(entityName: "Walk")
        //request.predicate = NSPredicate(format: "age = %@", "12")
        request.returnsObjectsAsFaults = false
        do {
            let result = try context!.fetch(request)
            print(String(result.count))
            for data in result as! [NSManagedObject] {
                print(data.value(forKey: "duration") as! Int64)
            }
            
        } catch {
            
            print("Failed")
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

