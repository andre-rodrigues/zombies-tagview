//
//  ViewController.m
//  Zombies
//
//  Created by Tagview Tecnologia on 2/25/14.
//  Copyright (c) 2014 Tagview Tecnologia. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    NSString *strUrl = @"http://192.168.1.5:5000";
    NSURL *url = [NSURL URLWithString:strUrl];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [_viewWeb loadRequest:request];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
