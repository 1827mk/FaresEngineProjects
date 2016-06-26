package com.nbu.fares.web;
import com.nbu.fares.domain.Promote;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;

@RooWebJson(jsonObject = Promote.class)
@Controller
@RequestMapping("/promotes")
@RooWebScaffold(path = "promotes", formBackingObject = Promote.class)
public class PromoteController {
}
