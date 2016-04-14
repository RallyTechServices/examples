Mixed Artifact Tree Example
=========================

![ScreenShot](/images/mixed-artifact-tree.png)

##Scenario
As a quality manager, I want to see User Stories and Defects that have TestCase children as well as 
Test Cases that do not belong to a User Story or Defect in one grid.  

## Overview
This example is to build a gridboard that shows TestCases, Defects and User Stories at the same level.  

##Interesting Bits
In this app, we have to override a dependency of the TreeGrid so that we can show TestCases at the "parent" level.
These modifications are found in the overrides.js file.  Please note that the class that we are overriding is 
private and there should be a disclaimer that it can change at any time.  

##Tags
gridboard parenttypes parentchildmapper

## License

AppTemplate is released under the MIT license.  See the file [LICENSE](./LICENSE) for the full text.

##Documentation for SDK

You can find the documentation on our help [site.](https://help.rallydev.com/apps/2.0/doc/)
