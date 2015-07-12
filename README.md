# cocos-2d-js-showcase
A training camp showcase of cocos 2d to app development.

This project uses npm, coffee and grunt

Sources of Knowledge
- Official Programmers Guide: http://cocos2d-x.org/programmersguide/1/index.html
- Sonar Systems: Cocos2d-x JavaScript Tutorial https://www.youtube.com/watch?v=4n0pxsP_sxw&list=PLRtjMdoYXLf7Dr6Tp22eJoqt1Ha2k17ck

TODO
- Write local run tutorial
- Add grunt task to run cocos web server


In order to allow this application to run on genymotion I had to hack into cocos core
frameworks/js-bindings/cocos2d-x/cocos/platform/android/java/src/org/cocos2dx/lib/Cocos2dxActivity.java

line 363
        -        isEmulator = product.equals("sdk") || product.contains("_sdk") || product.contains("sdk_");
        -        isEmulator = product.equals("sdk") || product.contains("_sdk") || product.contains("sdk_") || Build.FINGERPRINT.startsWith("generic");
