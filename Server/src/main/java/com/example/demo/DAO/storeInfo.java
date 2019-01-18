package com.example.demo.DAO;

public class storeInfo {
    private String _id;
     private String  cover;
    private String title;
    private String  avatarUrl;
    private String name;
    private String openId;
    private String swear;

    public storeInfo(String _id, String cover, String title, String avatarUrl, String name, String openId, String swear) {
        this._id = _id;
        this.cover = cover;
        this.title = title;
        this.avatarUrl = avatarUrl;
        this.name = name;
        this.openId = openId;
        this.swear = swear;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getSwear() {
        return swear;
    }

    public void setSwear(String swear) {
        this.swear = swear;
    }
}
