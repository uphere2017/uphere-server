# Uphere Server &middot; [![Code Climate](https://codeclimate.com/github/uphere2017/uphere-server/badges/gpa.svg)](https://codeclimate.com/github/uphere2017/uphere-server) [![Coverage Status](https://coveralls.io/repos/github/uphere2017/uphere-server/badge.svg?branch=dev)](https://coveralls.io/github/uphere2017/uphere-server?branch=dev) [![CircleCI](https://circleci.com/gh/uphere2017/uphere-server/tree/dev.svg?style=shield&circle-token=802c88ba534ab62792f2fdfe53958fd020637b97)](https://circleci.com/gh/uphere2017/uphere-server/tree/dev)

## Introduction

**Uphere**는 **Facebook Messenger**의 기본적인 기능과 Chatlog를 분석, 감정상태를 실시간으로 반영한 이모티콘을 볼 수 있는 간단한 채팅 어플리케이션 입니다.

## Requirements

- Uphere는 Facebook API를 사용했습니다.
- Facebook 친구들과 서비스를 이용할 수 있습니다.
- Facebook 가입이 선행되어야 합니다

## Features

- Facebook을 이용한 로그인 구현.
- Facebook과의 친구리스트 연동.
- 최신 메시지 sort.
- 최신 메시지 preview.
- 실시간 접속 상태 표시.
- Chatroom 생성과 삭제.
- 실시간 Chat.
- Chatlog 분석을 통한 실시간 감정상태 표시 (English Only)
- 파일전송 (Image Only)
- 미확인 메세지 푸쉬 알림.
- JSON Web Token Authentication

## Client-Side

- Babel과 함께 모던 자바스크립트(ES2015+)을 사용했습니다.
- Redux 라이브러리를 사용한 Flux 아키텍쳐 기반의 설계.
- React, Webpack, CSS Modules을 사용해서 컴포넌트 베이스 UI 아키텍처를 구현했습니다.
- Application state 관리는 Redux time-travel debugging을 이용했습니다.
- React Hot Loader 플러그인을 사용, 프론트 개발환경을 용이하게 만들었습니다.
- HTTP Client 라이브러리는 Promise 베이스의 axios을 선택했습니다.
- 실시간 양방향 소통을 위한 Socket.io를 사용했습니다.
- 감정 분석을 위해 Sentiment analysis를 사용했습니다.
- CSS는 별도의 프레임워크를 사용하지 않았습니다.

## Server-Side

- 자바스크립트 엔진(V8 engine)기반의 서버사이드 플랫폼인 Node.js로 구축했습니다.
- 서버사이드에서는 Node.js가 권장하는 ES5+을 사용했습니다
- Node.js 웹 어플리케이션 프레임워크 Express를 사용했습니다.
- JSON Web Token Authentication을 사용했습니다.
- 대표적인 NoSQL 데이터베이스, MongoDB를 사용했습니다.
- MongoDB 기반의 Node.js 전용 ODM 라이브러리인 Mongoose를 사용했습니다.
- 실시간 양방향 소통을 위한 Socket.io를 사용했습니다.
- BrowserSync를 사용했습니다.
- 빌드 자동화 툴인 Gulp를 사용했습니다.
- MongoDB 호스팅 플랫폼인 mlab을 사용했습니다.

## Test

- 자바스크립트 테스트 프레임워크인 Mocha를 사용했습니다.
- BDD / TDD assertion 라이브러리인 Chai를 사용했습니다.

## Continuous Integration

- 소스관리/빌드/테스트/배포의 지속적인 통합을 위한 CircleCI을 활용했습니다.

## Deployment

### Client

- AWS S3 Bucket으로 Static Website Hosting을 이용했습니다
- AWS CloudFront로 서비스 대기시간과 성능을 개선했습니다. (CDN서비스)

### Server

- AWS Codedeploy을 통한 배포 자동화를 구축했습니다.

## Version Control

- Web,Server의 독립적인 관리를 위해 GIT Repo를 구분
- Branch, Pull Request 기반 개발을 진행했습니다.

## Collaboration Tool

- Slack으로 팀원간의 의사소통.
- Trello를 통한 스케쥴 관리 및 Task 배분.

## DevOps

- Uphere Application은 개발부터 배포까지 상당 부분 자동화 되어 있습니다.
- Uphere Application은 uphere-Web과 uphere-Server로 Repo로 분리되어 있습니다.
- 각자의 Branch를 Push하는 순간 Github과 연동 되어있는 Code Climate이 Code Review를 시작합니다.
- Coaveralls가 Test Covarage를 시작합니다.
- dev Branch로 최종적으로 Merge한 순간 CircleCI가 동작합니다.
- Webhook 기능으로 모든 과정이 Slack 푸쉬 알림으로 전달됩니다.
- CircleCI에서 빌드와 테스트를 통과하면 uphere-Web의 최종본은 AWS S3버킷으로 전달 후 Static Website Hosting 됩니다.
- AWS CloudFront를 통해
- CircleCI에서 빌드와 테스트를 통과하면 uphere-Server는 최종본은 서버용 AWS S3버킷으로 전달 되어진 후, AWS EC2 Instance가 저장합니다.
- 최종적으로 AWS CodeDeploy 서비스를 통해 자동배포 됩니다.

## TeamMember

[손효정](https://github.com/hyojeongson), [윤송이](https://github.com/inakarune), [도진호](https://github.com/JinHo-Do), [이시우](https://github.com/postsw7), [안정현](https://github.com/kmmdong)

Special thanks to [Ken Huh](https://github.com/Ken123777)
