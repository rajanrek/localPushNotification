import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import PushNotification from "react-native-push-notification";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("on click NOTIFICATION:", notification);


      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },


      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }


  sendNoti = () => {
    console.log('pressed first')
    PushNotification.localNotification({
      channelId: "your-channel-id",
      title: "My Notification Title", // (optional)
      message: "Lets check local notification", // (required)
    });
  }
  scheduleNoti =()=>{
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "My Notification scheduled", // (required)
      date: new Date(Date.now() + 5 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    });
  }
  clearNoti =()=>{
    PushNotification.removeAllDeliveredNotifications();

  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', paddingHorizontal: 50 }}>
        <TouchableOpacity
          style={{ backgroundColor: 'green', height:50,  justifyContent: 'center', alignItems: 'center', }}
          onPress={() => this.sendNoti()}>
          <Text style={{ color: '#ffffff', fontSize: 18 }}>send push</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'green', height:50,  justifyContent: 'center', alignItems: 'center', }}
          onPress={() => this.scheduleNoti()}>
          <Text style={{ color: '#ffffff', fontSize: 18 }}>schedule push</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'green', height:50,  justifyContent: 'center', alignItems: 'center', }}
          onPress={() => this.clearNoti()}>
          <Text style={{ color: '#ffffff', fontSize: 18 }}>clear</Text>
        </TouchableOpacity>
        <Text> localpush </Text>
      </View>
    );
  }
}
