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
    var walkObjs: [Dictionary<String, Any>]?
    var defaultBlue: UIColor?
    //MARK: Properties
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var weeklyButton: UIButton!
    @IBOutlet weak var monthlyButton: UIButton!
    @IBOutlet weak var yearlyButton: UIButton!
    @IBOutlet weak var numWalksLabel: UILabel!
    @IBOutlet weak var totalDistLabel: UILabel!
    @IBOutlet weak var avgDistLabel: UILabel!
    @IBOutlet weak var totalStepsLabel: UILabel!
    @IBOutlet weak var avgStepsLabel: UILabel!
    @IBOutlet weak var totalTimeLabel: UILabel!
    @IBOutlet weak var avgTimeLabel: UILabel!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        defaultBlue = self.view.tintColor;
        loginButton.setTitleColor(.white, for: .normal);
        loginButton.backgroundColor = defaultBlue;
        loginButton.layer.cornerRadius = 5
        weeklyButton.layer.cornerRadius = 5
        monthlyButton.layer.cornerRadius = 5
        yearlyButton.layer.cornerRadius = 5
        // Do any additional setup after loading the view.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        
        let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        let context = appDelegate.persistentContainer.viewContext
        
        let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "UserInfo")
        var result: [NSManagedObject]?
        do {
            result = try context.fetch(fetchRequest)
            print(result!.count)
            if result!.count == 1 {
                let userInfo = result![0]
                firstName = userInfo.value(forKey: "firstName") as! String? ?? "John"
                lastName = userInfo.value(forKey: "lastName") as! String? ?? "Doe"
                loginButton.setTitle("Logout", for: .normal)
                loginButton.setTitleColor(.white, for: .normal);
                loginButton.backgroundColor = UIColor(displayP3Red: 1.0, green: 59.0/255.0, blue: 48.0/255.0, alpha: 1.0)
                nameLabel.text = firstName + " " + lastName
                nameLabel.isHidden = false;
            } else {
                for object in result! {
                    context.delete(object)
                }
                nameLabel.isHidden = true;
                try context.save()
            }
        } catch let error as NSError {
            print("Could not fetch. \(error), \(error.userInfo)")
        }
        
        getAndSetWalkObjects();
        calculateAndSetStatsForTimePeriod(6);
        
        setActiveButton(weeklyButton)
    }
    
    func getAndSetWalkObjects() {
        let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        let context = appDelegate.persistentContainer.viewContext
        let walkFetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Walk")
        var walkResults: [NSManagedObject]?
        var walkObjs: [Dictionary<String, Any>] = []
        do {
            walkResults = try context.fetch(walkFetchRequest)
            let result = walkResults!
            for walk in result {
                var dict: Dictionary = [String: Any]()
                dict["distance"] = walk.value(forKey: "distance") as! Double;
                dict["steps"] = walk.value(forKey: "steps") as! Int;
                dict["duration"] = walk.value(forKey: "duration") as! Int;
                dict["date"] = walk.value(forKey: "date") as! Date;
                
                walkObjs.append(dict)
            }
            self.walkObjs = walkObjs
        } catch let error as NSError {
            print("Could not fetch. \(error), \(error.userInfo)")
        }
    }
    
    func calculateAndSetStatsForTimePeriod(_ days: Int) {
        let weekAgo = Calendar.current.date(byAdding: .day, value: -1*days, to: Date())
        var totalDist = 0
        var totalSteps = 0
        var totalTime = 0
        var count = 0.0;
        for item in self.walkObjs! {
            if (item["date"] as! Date) < weekAgo! {
                continue;
            }
            count = count + 1
            totalDist += Int(item["distance"] as! Double)
            totalTime += item["duration"] as! Int
            totalSteps += item["steps"] as! Int
        }
        self.totalDistLabel.text = String(totalDist) + " meters"
        self.totalStepsLabel.text = String(totalSteps)
        self.totalTimeLabel.text = getTimeStringFromSeconds(Double(totalTime))
        self.avgDistLabel.text = String(Int(Double(totalDist)/count)) + " meters"
        self.avgStepsLabel.text = String(Int(Double(totalSteps)/count))
        self.avgTimeLabel.text = getTimeStringFromSeconds(Double(totalTime)/count)
        self.numWalksLabel.text = String(Int(count))
    }
    
    func getTimeStringFromSeconds(_ seconds: TimeInterval) -> String {
        let dcFormatter = DateComponentsFormatter()
        dcFormatter.unitsStyle = .abbreviated
        dcFormatter.allowedUnits = [.minute, .second, .hour]
        return String(dcFormatter.string(from: seconds as TimeInterval)!)
    }
    
    @IBAction func handleLoginButton(_ sender: Any) {
        if loginButton.currentTitle == "Patient Login" {
            performSegue(withIdentifier: "loginSegue", sender: self)
        } else {
            let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
            let context = appDelegate.persistentContainer.viewContext
            
            let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "UserInfo")
            var result: [NSManagedObject]?
            do {
                result = try context.fetch(fetchRequest)
                for object in result! {
                    context.delete(object)
                }
                try context.save()
            } catch let error as NSError {
                print("Could not fetch. \(error), \(error.userInfo)")
            }
            loginButton.setTitle("Patient Login", for: .normal)
            loginButton.backgroundColor = defaultBlue
            nameLabel.isHidden = true;
        }
        
    }
    
    @IBAction func handleWeeklyClick(_ sender: Any) {
        calculateAndSetStatsForTimePeriod(6)
        setActiveButton(weeklyButton);
        setInactiveButton(monthlyButton);
        setInactiveButton(yearlyButton);
    }
    
    @IBAction func handleMonthlyClick(_ sender: Any) {
        calculateAndSetStatsForTimePeriod(30)
        setActiveButton(monthlyButton);
        setInactiveButton(weeklyButton);
        setInactiveButton(yearlyButton);
    }
    
    @IBAction func handleYearlyClick(_ sender: Any) {
        calculateAndSetStatsForTimePeriod(364)
        setActiveButton(yearlyButton);
        setInactiveButton(monthlyButton);
        setInactiveButton(weeklyButton);
    }
    
    func setActiveButton(_ btn: UIButton) {
        btn.setTitleColor(.white, for: .normal);
        btn.backgroundColor = defaultBlue;
    }
    
    func setInactiveButton(_ btn: UIButton) {
        btn.setTitleColor(defaultBlue, for: .normal);
        btn.backgroundColor = .white;
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
