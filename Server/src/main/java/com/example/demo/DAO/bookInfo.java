package com.example.demo.DAO;

import com.mongodb.client.MongoDatabase;

public class bookInfo {
    private String _id;
    private String name;
    private String avatarUrl;
    private String  openId;
    private String cover;
    private String price;
    private String author;
    private String college;
    private String description;
    private String wechat;
    private String confirm;
    private String buyer;
    private String title;
    private String campus;
    private String type;
    private String grade;
    private String done;
    private String allinfo;

    public bookInfo(String _id, String name, String avatarUrl, String openId, String cover, String price, String author, String college, String description, String wechat, String confirm, String buyer, String title, String campus, String type, String grade, String done, String allinfo) {
        this._id = _id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.openId = openId;
        this.cover = cover;
        this.price = price;
        this.author = author;
        this.college = college;
        this.description = description;
        this.wechat = wechat;
        this.confirm = confirm;
        this.buyer = buyer;
        this.title = title;
        this.campus = campus;
        this.type = type;
        this.grade = grade;
        this.done = done;
        this.allinfo = allinfo;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getConfirm() {
        return confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getDone() {
        return done;
    }

    public void setDone(String done) {
        this.done = done;
    }

    public String getAllinfo() {
        return allinfo;
    }

    public void setAllinfo(String allinfo) {
        this.allinfo = allinfo;
    }
}
