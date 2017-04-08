# [Uphere Server](http://uphere.world) &middot; [![Code Climate](https://codeclimate.com/github/uphere2017/uphere-server/badges/gpa.svg)](https://codeclimate.com/github/uphere2017/uphere-server) [![Coverage Status](https://coveralls.io/repos/github/uphere2017/uphere-server/badge.svg?branch=dev)](https://coveralls.io/github/uphere2017/uphere-server?branch=dev) [![CircleCI](https://circleci.com/gh/uphere2017/uphere-server/tree/dev.svg?style=shield&circle-token=802c88ba534ab62792f2fdfe53958fd020637b97)](https://circleci.com/gh/uphere2017/uphere-server/tree/dev)

# Introduction

**Uphere**는 **Facebook Messenger**의 기본적인 기능과 Chatlog를 분석, 감정 상태를 실시간으로 반영한 이모티콘을 볼 수 있는 간단한 채팅 어플리케이션 입니다.

[![ScreenShot](https://raw.githubusercontent.com/uphere2017/uphere-web/dev/uphere_img2.png)](https://www.youtube.com/watch?v=24z1YykrtPc)

## Requirements

- Uphere는 Facebook API를 사용했습니다.
- Facebook 친구들과 서비스를 이용할 수 있습니다.
- Facebook 가입이 선행되어야 합니다.
- Chrome Browser를 권장합니다.

## Prerequisites

[MongoDB](https://docs.mongodb.com/manual/installation/), Node.js 설치

## Installation

### Client
```
git clone https://github.com/uphere2017/uphere-web
cd uphere-web
npm install
npm start
```

### Server
```
git clone https://github.com/uphere2017/uphere-server
cd uphere-server
npm install
npm start
```

## Features

- Facebook을 이용한 로그인 구현
- Facebook 친구 리스트 연동
- 최신 메시지 sort
- 최신 메시지 preview
- 실시간 접속 상태 표시
- Chatroom 생성과 삭제
- 실시간 Chat
- Chatlog 분석을 통한 실시간 감정 상태 표시 (English Only)
- 파일 전송 (Image Only)
- 미확인 메시지 푸쉬 알림
- JSON Web Token Authentication

## Client-Side

- Babel을 통한 모던 자바스크립트(ES2015+)
- Redux 라이브러리를 사용한 Flux 아키텍처 기반 설계
- React, Webpack, CSS Modules을 사용한 컴포넌트 베이스 UI 아키텍처 구현
- Redux time-travel debugging를 통한 Application state 관리
- React Hot Loader 플러그인을 사용, 프런트 개발 환경 간편화
- HTTP Client 라이브러리는 Promise 베이스의 axios
- 실시간 양방향 소통을 위한 Socket.io
- 감정 분석을 위한 Sentiment analysis
- CSS는 별도의 프레임워크를 사용하지 않았습니다.

## Server-Side

- 자바스크립트 엔진(V8 engine)기반의 서버사이드 플랫폼 Node.js
- 서버사이드에서는 Node.js가 권장하는 ES5+
- Node.js 웹 어플리케이션 프레임워크 Express
- JSON Web Token Authentication
- 대표적인 NoSQL 데이터베이스, MongoDB
- MongoDB 기반의 Node.js 전용 ODM 라이브러리 Mongoose
- 실시간 양방향 소통을 위한 Socket.io
- BrowserSync
- 빌드 자동화 툴인 Gulp
- MongoDB 호스팅 플랫폼인 mlab

## Test

- 자바스크립트 테스트 프레임워크 Mocha
- BDD / TDD assertion 라이브러리 Chai

## Continuous Integration

- 소스관리/빌드/테스트/배포의 지속적인 통합을 위한 CircleCI

## Deployment

### Client

- AWS S3 Bucket의 Static Website Hosting
- AWS CloudFront 서비스 대기시간과 성능을 개선(CDN서비스)

### Server

- AWS Codedeploy 배포 자동화 구축

## Version Control

- Web, Server의 독립적인 관리를 위한 GIT Repo 구분
- Branch, Pull Request 기반 개발 진행

## Collaboration Tool

- Slack 팀원 간의 의사소통
- Trello 스케쥴 관리 및 Task 배분

## DevOps

- Uphere Application은 개발부터 배포까지 상당 부분 자동화되어 있습니다.
- Uphere Application은 uphere-Web / uphere-Server 두개의 Repo로 관리합니다.
- 각자의 Branch를 Push하는 순간 Github과 연동되어 있는 Code Climate이 Code Review를 시작합니다.
- Coveralls가 Test Coverage를 시작합니다.
- dev Branch가 최종적으로 Merge되는 순간 CircleCI가 동작합니다.
- Webhook 기능으로 모든 과정이 Slack 푸쉬 알림으로 전달됩니다.
- CircleCI 빌드와 테스트가 통과되면 uphere-Web의 최종본은 AWS S3버킷으로 전달 후, Static Website Hosting 됩니다.
- AWS CloudFront를 통해 웹사이트 전송을 가속화 합니다.
- CircleCI 빌드와 테스트를 통과되면 uphere-Server의 최종본은 서버용 AWS S3버킷으로 전달 된 후, AWS EC2 Instance가 저장합니다.
- AWS CodeDeploy로 자동 배포 됩니다.

## Things to do

실력적으로 부족함이 많고 갈 길도 먼 5명의 팀원이 자바스크립트를 기반으로 3주간 진행한 Uphere Project.
짧은 프로젝트 기간으로 인한 아쉬움이 고스란히 보완할 점으로 남았습니다.

- Seperate Concerns
- Unit Test
- Integration Test
- HTTPS 세팅
- Video Chat
- 전반적인 UX 향상
- Cross Browser Compatibility
- Mobile 반응형
- Code Refactoring
- 버그 해결

## Team Members

[손효정](https://github.com/hyojeongson), [윤송이](https://github.com/inakarune), [도진호](https://github.com/JinHo-Do), [이시우](https://github.com/postsw7), [안정현](https://github.com/kmmdong)

Special thanks to [Ken Huh](https://github.com/Ken123777)
