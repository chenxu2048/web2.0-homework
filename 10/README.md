# 启动姿势

**注意，本README可能只在debian系操作系统有效，其他操作系统请好运**

1. 首先跟``mongodb``进行<del>py</del>交易。

  + 启动命令``mongod --dbpath $(DB_DIR)`` 其中``$(DB_DIR)``是路径名称
  + 如果你使用的是``bash``，可以这样写
```
$ DB_DIR=data
$ mongod --dbpath $(DB_DIR)
```
  + 如果想自己搞个大新闻，换个端口，请自己设置

2. 然后再跟``npm``赛艇
  ``npm install``

3. 启动

  + 如果你不``angry``，前面也不搞什么大新闻，可以这样写``npm start``。
  + 如果你想看``debug``，请在前面加上``DEBUG=signin:*``，然而并没有什么用，因为我没有自己用过这玩意。
  + 如果``You're angry``，想换端口，请在前面加上``PORT=$(port)``，``$(port)``是端口号
  + 如果你前面搞了大新闻，换了``mongod``的端口，请在前面加``MONGOPORT=$(mongoport)``，``$(mongoport)``就是搞出来的``mongo``端口号

### 栗子

  如果你想比某方记者跑得快，可以这样搞事
```
$  mongod --dbpath data --port 1234 &
$  sudo PORT=80 MONGOPORT=1234 DEBUG=signin:* npm start
```