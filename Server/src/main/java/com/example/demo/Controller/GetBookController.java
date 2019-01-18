package com.example.demo.Controller;
import com.example.demo.*;
import com.example.demo.DAO.MongoDBUtil;
import com.example.demo.DAO.bookDAO;
import com.example.demo.DAO.bookInfo;
import com.example.demo.DAO.storeInfo;
import com.google.gson.Gson;
import com.mongodb.client.MongoDatabase;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.bson.Document;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "对数据库进行增删查改操作")

public class GetBookController {

    //************************************************************************//
    //查找


    //获取所有图书
    @ApiOperation(value = "",notes="输出所有图书")
    @RequestMapping(value = "/allBook",method = RequestMethod.GET)
    public String allBook(Model model) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.findTest(db,"cBook");
        return book;
    }
    //根据_ID获取图书
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "MongoDB的字条ID",notes="输出该ID图书信息")
    @RequestMapping(value = "/_id/{v}",method = RequestMethod.GET)
    public String getBookbyId(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook","_id",v);
        return book;
    }
    //根据_ID获取图书
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "书名",notes="输出该名字图书")
    @RequestMapping(value = "/title/{v}",method = RequestMethod.GET)
    public String title(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook","title",v);
        return book;
    }
    //根据openID获取图书
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "该用户微信openId",notes="输出该openId图书信息")
    @RequestMapping(value = "/openId/{v}",method = RequestMethod.GET)
    public String onePerson(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook","openId",v);
        return book;
    }
    @ApiOperation(value = "匹配信息的name和key",notes="输出图书信息")
    @RequestMapping(value = "/{k}/{v}",method = RequestMethod.GET)
    public String find(@PathVariable("k") String k,@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook",k,v);
        return book;
    }
    //根据购买者获取图书
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "图书购买者",notes="输出该购买者的图书")
    @RequestMapping(value = "/buyer/{v}",method = RequestMethod.GET)
    public String buyer(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook","buyer",v);
        return book;
    }
    //获取未卖出图书
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "是否被买0/1",notes="输出对应类别图书信息")
    @RequestMapping(value = "/done/{v}",method = RequestMethod.GET)
    public String nosell(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook","done",v);
        return book;
    }
    //获取人名的图书
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "该用户微信昵称",notes="输出该昵称图书信息")
    @RequestMapping(value = "/name/{v}",method = RequestMethod.GET)
    public String name(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.FilterfindTest(db,"cBook","name",v);
        return book;
    }
    //获取所有店铺
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "",notes="输出所有店铺")
    @RequestMapping(value = "/store",method = RequestMethod.GET)
    public String store() {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        String book = bookdao.findTest(db,"cStore");
        return book;
    }

    //**************************************************************************************//

    //**************************************************************************************//
    //插入
    //插入图书
    @ApiOperation(value = "图书信息",notes="插入图书")
    @RequestMapping(value = "/insert_book/{v}",method = RequestMethod.GET)
    public void insert_book(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        Gson gson = new Gson();
        bookInfo user = gson.fromJson(v, bookInfo.class);
        Document document = new Document("name", user.getName())
                .append("openId", user.getOpenId())
                .append("price", user.getPrice());
        bookdao.insertOneTest(db,"cBook",document);
    }
    //插入店铺
    @ApiOperation(value = "店铺信息",notes="插入店铺")
    @RequestMapping(value = "/insert_store/{v}",method = RequestMethod.GET)
    public void insert_store(@PathVariable("v") String v) {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        Gson gson = new Gson();
        storeInfo user = gson.fromJson(v, storeInfo.class);
        Document document = new Document("name", user.getName())
                .append("openId", user.getOpenId())
                .append("titile", user.getTitle());
        bookdao.insertOneTest(db,"cStore",document);
    }
    //*******************************************************************
    //修改信息
    //修改图书
    @ApiOperation(value = "原名称和键值",notes="修改一本图书信息")
    @RequestMapping(value = "/update_oneBook/{k1}/{v1}/{k2}/{v2}",method = RequestMethod.GET)
    public void update_oneBook(@PathVariable("k1") String k1,@PathVariable("v1") String v1,@PathVariable("k2") String k2,@PathVariable("v2") String v2)
    {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        bookdao.updateOneTest(db,"cBook",k1,v1,k2,v2);
    }
    @ApiOperation(value = "原名称和键值",notes="修改所有图书信息")
    @RequestMapping(value = "/update_allBook/{k1}/{v1}/{k2}/{v2}",method = RequestMethod.GET)
    public void update_allBook(@PathVariable("k1") String k1,@PathVariable("v1") String v1,@PathVariable("k2") String k2,@PathVariable("v2") String v2)
    {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        bookdao.updateManyTest(db,"cBook",k1,v1,k2,v2);
    }
    //修改

    //删除
  //************************************************************************
    @ApiOperation(value = "名称和键值",notes="删除第一本图书信息")
    @RequestMapping(value = "/delete_oneBook/{k1}/{v1}",method = RequestMethod.GET)
    public void delete_oneBook(@PathVariable("k1") String k1,@PathVariable("v1") String v1)
    {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        bookdao.deleteOneTest(db,"cBook",k1,v1);
    }
    @ApiOperation(value = "名称和键值",notes="删除所有图书信息")
    @RequestMapping(value = "/delete_allBook/{k1}/{v1}",method = RequestMethod.GET)
    public void delete_allBook(@PathVariable("k1") String k1,@PathVariable("v1") String v1)
    {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        bookdao.deleteManyTest(db,"cBook",k1,v1);
    }

    @ApiOperation(value = "名称和键值",notes="删除第一个店铺信息")
    @RequestMapping(value = "/delete_oneStore/{k1}/{v1}",method = RequestMethod.GET)
    public void delete_oneStore(@PathVariable("k1") String k1,@PathVariable("v1") String v1)
    {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        bookdao.deleteOneTest(db,"cStore",k1,v1);
    }
    @ApiOperation(value = "名称和键值",notes="删除所有店铺信息")
    @RequestMapping(value = "/delete_allStore/{k1}/{v1}",method = RequestMethod.GET)
    public void delete_allStore(@PathVariable("k1") String k1,@PathVariable("v1") String v1)
    {
        //return "Hello Spring Boot!";
        MongoDBUtil mongoCon = new MongoDBUtil();
        MongoDatabase db = mongoCon.getConnect();
        bookDAO bookdao = new bookDAO();
        bookdao.deleteManyTest(db,"cStore",k1,v1);
    }
    //*********************************************************************
}
