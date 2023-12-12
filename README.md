# FastLog ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=anthonyissa.fastlog)

_Made for developers who are tired of wasting time on monitoring.
Let us take care of the complexity while you focus on building your app._ <br>

Fastlog lets you monitor your apps using an on-premise solution. The setup is really fast and easy. <br>
Landing page at https://fast-log.vercel.app/ to see more, signup is locked for now as I'm using this version of the app for my tests.

## Supabase

You'll need to setup a supabase account and project to use Fastlog for now. In the future, I'll integrate on-premise supabase along with Fastlog (work in progress). <br>
Supabase will handle authentication and database management and it's really easy to use. This is why I integrated it with this project. <br>
https://supabase.com/

## Fastlog App

First, clone the repository.
<br><br>
You'll need to create two `.env` files. One in /front-end and the other in /back-end using the `example.env` in each folder. <br>
Most of the information needed will be at https://supabase.com/dashboard/project/PROJECT_ID/settings/api <br><br>
![image](https://github.com/anthonyissa/FastLog/assets/77232502/7830eec8-4907-4aed-9571-a8f908344a4c)
<br> <br>
You can now compose the app:
Run `docker compose up` at the root of the project.
<br><br>
Fastlog should be up and running!

## Fastlog SDK

https://www.npmjs.com/package/fastlog-sdk <br>
You can install the SDK and integrate it in your app to start using fastlog. <br>
For now fastlog SDK is only available for node but I'm currently working on other languages. Python will be next.

You'll find the guide to use Fastlog here: https://personal-88.gitbook.io/fastlog/
