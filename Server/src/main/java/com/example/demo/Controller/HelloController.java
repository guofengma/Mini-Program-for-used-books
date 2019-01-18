package com.example.demo.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "API功能测试接口")
public class HelloController {
    //http://localhost:8080/hello?a=1
    @ApiOperation(value = "传入数值",notes="输出传入信息")
   @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public int hello(@RequestParam("a") int a, Model model) {
        //return "Hello Spring Boot!";
        return a;
    }
    //RESTful
    //http://localhost:8080/print/1
    @ApiOperation(value = "传入数值",notes="输出传入信息")
    @RequestMapping(value = "/print/{a}",method = RequestMethod.GET)
    public int print(@PathVariable("a") int a) {
        //return "Hello Spring Boot!";
        return a;
    }
}
//@RestController 注解： 该注解是 @Controller 和 @ResponseBody 注解的合体版