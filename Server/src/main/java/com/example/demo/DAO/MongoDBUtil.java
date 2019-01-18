package com.example.demo.DAO;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

//mongodb 连接数据库工具类
public class MongoDBUtil {
    //不通过认证获取连接数据库对象
    static final String DBName = "test";
    static final String ServerAddress = "127.0.0.1";
    static final int PORT = 27017;

    public  MongoDatabase getConnect(){
        //连接到 mongodb 服务
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient("localhost", 27017);
            System.out.println("Connect to mongodb successfully");
        }catch (Exception e){
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
        //连接到数据库
        MongoDatabase mongoDatabase = null;
        try {
            mongoDatabase = mongoClient.getDatabase("test");
            System.out.println("<______________Mongodb数据库连接成功！_____________>");
        }catch (Exception e){
            e.printStackTrace();
        }
        //返回连接数据库对象
        return mongoDatabase;
    }
    public void closeMongoClient(MongoDatabase mongoDataBase,MongoClient mongoClient ) {
        if (mongoDataBase != null) {
            mongoDataBase = null;
        }
        if (mongoClient != null) {
            mongoClient.close();
        }
        System.out.println("CloseMongoClient successfully");
    }


    //需要密码认证方式连接
    /*public static MongoDatabase getConnect2(){
        List<ServerAddress> adds = new ArrayList<>();
        //ServerAddress()两个参数分别为 服务器地址 和 端口
        ServerAddress serverAddress = new ServerAddress("localhost", 27017);
        adds.add(serverAddress);

        List<MongoCredential> credentials = new ArrayList<>();
        //MongoCredential.createScramSha1Credential()三个参数分别为 用户名 数据库名称 密码
        MongoCredential mongoCredential = MongoCredential.createScramSha1Credential("username", "databaseName", "password".toCharArray());
        credentials.add(mongoCredential);

        //通过连接认证获取MongoDB连接
        MongoClient mongoClient = new MongoClient(adds, credentials);

        //连接到数据库
        MongoDatabase mongoDatabase = mongoClient.getDatabase("test");

        //返回连接数据库对象
        return mongoDatabase;
    }*/

}

