package com.example.demo.DAO;

import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class bookDAO implements MongoDao {

    @Override
    public Map<String, Integer> queryByID(MongoDatabase db, String table, Object Id) throws Exception {
        return null;
    }

    public Map<String, Integer> queryAll(MongoDatabase db, String table) throws Exception {
        MongoCollection<Document> collection = db.getCollection("booklist");
        return null;
    }

    public void insertOneTest(MongoDatabase db,String table,Document doc){

        MongoCollection<Document> collection = db.getCollection(table);
        collection.insertOne(doc);
    }

    public void insertManyTest(MongoDatabase db,String table){
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //要插入的数据
        List<Document> list = new ArrayList<>();
        for(int i = 1; i <= 3; i++) {
            Document document = new Document("name", "张三")
                    .append("sex", "男")
                    .append("age", 18);
            list.add(document);
        }
        //插入多个文档
        collection.insertMany(list);
    }
    public void deleteOneTest(MongoDatabase db,String table,String k,String v){
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //申明删除条件
        Bson filter = Filters.eq(k,v);
        //删除与筛选器匹配的单个文档
        collection.deleteOne(filter);
    }

    public void deleteManyTest(MongoDatabase db,String table,String k,String v){
        //获取数据库连接对象
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //申明删除条件
        Bson filter = Filters.eq(k,v);
        //删除与筛选器匹配的所有文档
        collection.deleteMany(filter);
    }
    public void updateOneTest(MongoDatabase db,String table,String key,String value,String key2,String value2){
        //获取数据库连接对象
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //修改过滤器
        Bson filter = Filters.eq(key, value);
        //指定修改的更新文档
        Document document = new Document("$set", new Document(key2, value2));
        //修改单个文档
        collection.updateOne(filter, document);
    }
    public void updateManyTest(MongoDatabase db,String table,String key,String value,String key2,String value2){
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //修改过滤器
        Bson filter = Filters.eq(key, value);
        //指定修改的更新文档
        Document document = new Document("$set", new Document(key2, value2));
        //修改多个文档
        collection.updateMany(filter, document);
    }

    public String  findTest(MongoDatabase db,String table){
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //查找集合中的所有文档
        FindIterable findIterable = collection.find();
        MongoCursor cursor = findIterable.iterator();
        String jon = "{" ;
        while (cursor.hasNext()) {
            String str = cursor.next().toString();
            int len = str.length();
            str = str.substring(9,len-1);
            System.out.println(str);
            jon = jon + str;
        }
        jon = jon +"}";
        return jon;
    }

    public String FilterfindTest(MongoDatabase db,String table,String fieldname,String value){
        //获取数据库连接对象
        //获取集合
        MongoCollection<Document> collection = db.getCollection(table);
        //指定查询过滤器
        Bson filter = Filters.eq(fieldname, value);
        //指定查询过滤器查询
        FindIterable findIterable = collection.find(filter);
        MongoCursor cursor = findIterable.iterator();
        String jon = "{" ;
        while (cursor.hasNext()) {
            String str = cursor.next().toString();
            int len = str.length();
            str = str.substring(9,len-1);
            System.out.println(str);
            jon = jon + str;
        }
        jon = jon +"}";
        return jon;
    }



    @Override
    public boolean insert(MongoDatabase db, String table, Document doc) {
        return false;
    }

    @Override
    public boolean delete(MongoDatabase db, String table, BasicDBObject doc) {
        return false;
    }

    @Override
    public boolean update(MongoDatabase db, String table, BasicDBObject oldDoc, BasicDBObject newDoc) {
        return false;
    }
}
