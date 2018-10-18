//
//  WalkSyncing.swift
//  WalkAroundTheBlock
//
//  Created by Heinrich Malan on 18/10/18.
//  Copyright © 2018 Heinrich Malan. All rights reserved.
//

import Foundation
import CoreLocation
import SystemConfiguration
import UIKit
import CoreData

public class Reachability {
    
    class func isConnectedToNetwork() -> Bool {
        
        var zeroAddress = sockaddr_in(sin_len: 0, sin_family: 0, sin_port: 0, sin_addr: in_addr(s_addr: 0), sin_zero: (0, 0, 0, 0, 0, 0, 0, 0))
        zeroAddress.sin_len = UInt8(MemoryLayout.size(ofValue: zeroAddress))
        zeroAddress.sin_family = sa_family_t(AF_INET)
        
        let defaultRouteReachability = withUnsafePointer(to: &zeroAddress) {
            $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {zeroSockAddress in
                SCNetworkReachabilityCreateWithAddress(nil, zeroSockAddress)
            }
        }
        
        var flags: SCNetworkReachabilityFlags = SCNetworkReachabilityFlags(rawValue: 0)
        if SCNetworkReachabilityGetFlags(defaultRouteReachability!, &flags) == false {
            return false
        }
        
        /* Only Working for WIFI
         let isReachable = flags == .reachable
         let needsConnection = flags == .connectionRequired
         
         return isReachable && !needsConnection
         */
        
        // Working for Cellular and WIFI
        let isReachable = (flags.rawValue & UInt32(kSCNetworkFlagsReachable)) != 0
        let needsConnection = (flags.rawValue & UInt32(kSCNetworkFlagsConnectionRequired)) != 0
        let ret = (isReachable && !needsConnection)
        
        return ret
        
    }
}

class WalkSyncing {
    
    init() {
    }
    
    static func isLoggedIn() -> String? {
        
        let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        let context = appDelegate.persistentContainer.viewContext
        let fetchRequestToken = NSFetchRequest<NSManagedObject>(entityName: "UserInfo")
        var tokenResult: [NSManagedObject]?
        
        do {
            tokenResult = try context.fetch(fetchRequestToken)
            if tokenResult!.count == 1 {
                return (tokenResult![0].value(forKey: "token") as! String)
            } else {
                return nil
            }
        } catch let err {
            print(err)
        }
        return nil;
    }
    
    static func syncWalkItems() {
        let token = isLoggedIn()
        if token == nil || !Reachability.isConnectedToNetwork() {
            print("Token nil or no network")
            return
        }
        let appDelegate = (UIApplication.shared.delegate as! AppDelegate)
        let context = appDelegate.persistentContainer.viewContext
        let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "Walk")
        var result: [NSManagedObject]?
        var walks: [Any] = []
        var data = ["token": token!, "walks": walks ] as [String : Any]
        do {
            result = try context.fetch(fetchRequest)
            
            for object in result! {
                
                //declare parameter as a dictionary which contains string as key and value combination.
                let synched = object.value(forKey: "synched") as! Bool? ?? false
                if synched {
                    continue
                }
                let numSteps = object.value(forKey: "steps") as! Int
                let distance = object.value(forKey: "distance") as! Double
                let duration = object.value(forKey: "duration") as! Int
                let goalType = object.value(forKey: "goal") as! String
                let goalValue = object.value(forKey: "goalValue") as! Int
                let date = object.value(forKey: "date") as! Date
                let dateMillis = date.timeIntervalSince1970 as! Double
                let parameters = ["date": dateMillis, "numSteps": numSteps, "distance": distance, "duration": duration, "goalType":goalType, "goalValue": goalValue] as [String : Any]
                
                walks.append(parameters)
                object.setValue(true, forKey: "synched")
                
                try context.save()
            }
            if walks.count == 0 {
                print("No walks to sync")
                return
            }
            data["walks"] = walks
            //create the url with NSURL
            let url = NSURL(string: "http://192.168.1.117:8080/api/v1/walkData/")
            
            //create the session object
            let session = URLSession.shared
            
            //now create the NSMutableRequest object using the url object
            let request = NSMutableURLRequest(url: url! as URL)
            request.httpMethod = "POST" //set http method as POST
            
            do {
                request.httpBody = try JSONSerialization.data(withJSONObject: data, options: .prettyPrinted) // pass dictionary to nsdata object and set it as request body
                
            } catch let error {
                print(error.localizedDescription)
            }
            
            //HTTP Headers
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue("application/json", forHTTPHeaderField: "Accept")
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
                    }
                    
                } catch let error {
                    print(error.localizedDescription)
                }
                
            })
            
            task.resume()
            
        } catch let error as NSError {
            print("Could not fetch. \(error), \(error.userInfo)")
        }
        
    }
}
