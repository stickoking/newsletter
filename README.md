
# Newsletter

## Description
This is a simple newsletter / email list signup server with MailChimp Integration.
This project is using express.js server, feel free to use it on your own application.

---

### **Getting Started**

#### **Node installation**
* Head over to [Node](https://nodejs.org/en/ "Node.js Download") and install Node.js

#### **Package Manager Installation**
##### NPM Package Manager
* Note, npm is automatically installed with Node there is no need for additional installation

##### Yarn Package Manager
* Installation
    * Run the following command in your terminal.
 ```bash
 npm install -g yarn
 ```

---

### **Setting Up Dependencies**

#### NPM
* Run the following command in your terminal
```bash
npm install
```
#### Yarn
* Run the following command in your terminal
```bash
yarn
```

Note\* You only need to run one of the above depending on the choice of package manager you wish to use, please ensure you're in the directory of the project on your terminal when setting up dependencies.

---

### **Code setup with your mailchimp account.**

#### Open App.js file, head to line 23 and edit the following code.

```javascript
 const url = 'https://usX.api.mailchimp.com/3.0/lists/listID key'
```

1. Replace usX with the .usX value at the end of your mailchimp api key where X is a numeric value such as us1
1. Replace listID with your mailchimp listID key.

In the App.js file head over to line 29

```javascript
 const options = {
        method: "POST",
        auth: "username:apiKey"
    }
```
* Replace the username:apiKey with the following
    1. username with your mailchimp username
    1. apiKey with your mailchimp api key
---





