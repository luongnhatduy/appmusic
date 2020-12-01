### run ios
rm -rf node_modules/ && yarn && cd ios && rm -rf Pods && rm -rf build && rm -rf Podfile.lock && pod install && cd .. && yarn ios

### run android
rm -rf node_modules/ && yarn && yarn android
npx jetifier && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew clean && ./gradlew assembleDebug && cd ..

### intro video
![](intro.gif)

### run

react-native run-ios --simulator="iPhone 11 Pro Max"