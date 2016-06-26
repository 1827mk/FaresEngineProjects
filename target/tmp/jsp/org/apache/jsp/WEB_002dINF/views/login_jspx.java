package org.apache.jsp.WEB_002dINF.views;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class login_jspx extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

static private org.apache.jasper.runtime.ProtectedFunctionMapper _jspx_fnmap_0;

static {
  _jspx_fnmap_0= org.apache.jasper.runtime.ProtectedFunctionMapper.getMapForFunction("fn:escapeXml", org.apache.taglibs.standard.functions.Functions.class, "escapeXml", new Class[] {java.lang.String.class});
}

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_out_value_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_spring_message_var_htmlEscape_code_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_spring_url_var_value_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_spring_message_var_code_nobody;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_c_out_value_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_spring_message_var_htmlEscape_code_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_spring_url_var_value_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_spring_message_var_code_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_c_out_value_nobody.release();
    _jspx_tagPool_spring_message_var_htmlEscape_code_nobody.release();
    _jspx_tagPool_spring_url_var_value_nobody.release();
    _jspx_tagPool_spring_message_var_code_nobody.release();
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("<div version=\"2.0\">");
      if (_jspx_meth_spring_url_0(_jspx_page_context))
        return;
      if (_jspx_meth_spring_url_1(_jspx_page_context))
        return;
      if (_jspx_meth_spring_url_2(_jspx_page_context))
        return;
      if (_jspx_meth_spring_message_0(_jspx_page_context))
        return;
      if (_jspx_meth_spring_message_1(_jspx_page_context))
        return;
      if (_jspx_meth_spring_message_2(_jspx_page_context))
        return;
      out.write("<style>");
      out.write("\n");
      out.write("    #iconchair{\n");
      out.write("      width:300px;\n");
      out.write("      margin-top: -40px;\n");
      out.write("\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    h2 b{text-shadow: 0 0 0.2em #F87, 0 0 0.2em #F87;\n");
      out.write("      -moz-box-shadow:inset 0 0 50px #e8e5e2;\n");
      out.write("      -webkit-box-shadow:inset 0 0 50px #e8e5e2;\n");
      out.write("      box-shadow:inset 0 0 50px #e8e5e2;\n");
      out.write("      padding: 30px;\n");
      out.write("    }\n");
      out.write("    body {\n");
      out.write("      background: url(\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\") no-repeat center center fixed;\n");
      out.write("      -webkit-background-size: cover;\n");
      out.write("      -moz-background-size: cover;\n");
      out.write("      -o-background-size: cover;\n");
      out.write("      background-size: cover;\n");
      out.write("      /*            background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0, url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") repeat 0 0;\n");
      out.write("\n");
      out.write("                  background: -moz-linear-gradient(top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0;\n");
      out.write("\n");
      out.write("                  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.1)), color-stop(100%,rgba(255,255,255,0.1))), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0;\n");
      out.write("\n");
      out.write("                  background: -webkit-linear-gradient(top, rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.1) 100%), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0;\n");
      out.write("\n");
      out.write("                  background: -o-linear-gradient(top, rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.1) 100%), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0;\n");
      out.write("\n");
      out.write("                  background: -ms-linear-gradient(top, rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.1) 100%), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0;\n");
      out.write("\n");
      out.write("                  background: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.1) 100%), url(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${url_background}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write(") no-repeat 0 0;*/\n");
      out.write("\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .navbar-footer-description{\n");
      out.write("      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#eeeeee+46,cccccc+100 */\n");
      out.write("      background: #eeeeee; /* Old browsers */\n");
      out.write("      background: -moz-linear-gradient(top,  #eeeeee 46%, #cccccc 100%); /* FF3.6+ */\n");
      out.write("      background: -webkit-gradient(linear, left top, left bottom, color-stop(46%,#eeeeee), color-stop(100%,#cccccc)); /* Chrome,Safari4+ */\n");
      out.write("      background: -webkit-linear-gradient(top,  #eeeeee 46%,#cccccc 100%); /* Chrome10+,Safari5.1+ */\n");
      out.write("      background: -o-linear-gradient(top,  #eeeeee 46%,#cccccc 100%); /* Opera 11.10+ */\n");
      out.write("      background: -ms-linear-gradient(top,  #eeeeee 46%,#cccccc 100%); /* IE10+ */\n");
      out.write("      background: linear-gradient(to bottom,  #eeeeee 46%,#cccccc 100%); /* W3C */\n");
      out.write("      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#cccccc',GradientType=0 ); /* IE6-9 */\n");
      out.write("\n");
      out.write("    }\n");
      out.write("\n");
      out.write("  ");
      out.write("</style>");
      out.write("<div class=\"container-fluid\">");
      out.write("<div class=\"row\">");
      out.write("<div class=\"col-sm-12\">");
      out.write("<center>");
      out.write("<h2 style=\"margin-top: 30px;\">");
      out.write("<b>");
      out.write("ระบบจัดการอัตราค่าโดยสาร");
      out.write("</b>");
      out.write("</h2>");
      out.write("</center>");
      out.write("<div id=\"container_login\" style=\"display: none ;margin-top: -70px;\" class=\"col-sm-4\">");
      out.write("<form style=\"margin-top: 30%;\" role=\"form\" method=\"POST\" action=\"" + (java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${fn:escapeXml(form_url)}", java.lang.String.class, (PageContext)_jspx_page_context, _jspx_fnmap_0) + "\" name=\"f\">");
      out.write("<div class=\"\">");
      out.write("<ul class=\"media-list\">");
      out.write("<li class=\"media\">");
      out.write("<div style=\"margin-top: 30px; margin-bottom: 120px;\" class=\"col-sm-4 hidden-xs\">");
      if (_jspx_meth_spring_url_3(_jspx_page_context))
        return;
      out.write("<div style=\"margin-top: 10px;\" align=\"right\">");
      out.write("<div style=\"width: 70px; height: 70px;\">");
      out.write("<img src=\"" + (java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${image_login_url}", java.lang.String.class, (PageContext)_jspx_page_context, null) + "\" id=\"iconchair\" />");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("</li>");
      out.write("</ul>");
      out.write("</div>");
      out.write("<br />");
      out.write("<div style=\"border:10px solid #ECF0F1;border-radius: 2%;margin-bottom: 150px; margin-top: -60px;\" class=\"well\">");
      out.write("<div style=\"display: none;\" id=\"_alert_login_fail_id\" role=\"alert\" class=\"alert alert-danger alert-dismissible\">");
      out.write("<button data-dismiss=\"alert\" class=\"close\" type=\"button\">");
      out.write("<span class=\"fa fa-times\">");
      out.write("</span>");
      out.write("<span class=\"sr-only\">");
      out.write("ตกลง");
      out.write("</span>");
      out.write("</button>");
      out.write("\n");
      out.write("                เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลของคุณ หรือ สิทธิของคุณถูกยกเลิกการใช้งาน!\n");
      out.write("              ");
      out.write("</div>");
      out.write("<div class=\"form-group\">");
      out.write("<label for=\"j_username\" class=\"sr-only\">");
      if (_jspx_meth_c_out_0(_jspx_page_context))
        return;
      out.write("</label>");
      out.write("<input required=\"true\" placeholder=\"ชื่อผู้ใช้งาน\" autocomplete=\"off\" name=\"j_username\" type=\"text\" class=\"form-control\" id=\"j_username\" />");
      out.write("</div>");
      out.write("<div class=\"form-group has-feedback\">");
      out.write("<label for=\"j_password\" class=\"sr-only\">");
      if (_jspx_meth_c_out_1(_jspx_page_context))
        return;
      out.write("</label>");
      out.write("<input required=\"true\" placeholder=\"รหัสผ่าน\" autocomplete=\"off\" name=\"j_password\" type=\"password\" class=\"form-control\" id=\"j_password\" />");
      out.write("</div>");
      out.write("<div class=\"form-group\">");
      out.write("<button id=\"submit_button\" class=\"btn btn-material-red-500 btn-raised\" type=\"submit\">");
      out.write("เข้าสู่ระบบ");
      out.write("</button>");
      out.write("</div>");
      out.write("<div class=\"form-group\">");
      out.write("<p class=\"text-muted\">");
      out.write("<a data-target=\"#_modal_forgot_password_id\" data-toggle=\"modal\" href=\"#\">");
      out.write("ลืมรหัสผ่านใช่ไหม ?");
      out.write("</a>");
      out.write("</p>");
      out.write("</div>");
      out.write("</div>");
      out.write("</form>");
      out.write("</div>");
      out.write("<div class=\"col-sm-7\">");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("<div data-backdrop=\"static\" aria-hidden=\"true\" aria-labelledby=\"_modal_forgot_password_id\" role=\"dialog\" tabindex=\"-1\" id=\"_modal_forgot_password_id\" class=\"modal fade\">");
      out.write("<div class=\"modal-dialog\">");
      out.write("<div class=\"modal-content\">");
      out.write("<div class=\"modal-header\">");
      out.write("<div class=\"page-header\">");
      out.write("<h4 class=\"modal-title\">");
      out.write("<span class=\"fa fa-exclamation-triangle text-warning\">");
      out.write("   ");
      out.write("</span>");
      out.write("ลืมรหัสผ่านของคุณใช่ไหม ?");
      out.write("</h4>");
      out.write("</div>");
      out.write("</div>");
      out.write("<div class=\"modal-body\">");
      out.write("<p>");
      out.write("กรุณาติดต่อเจ้าหน้าที่ฝ่ายไอที เพื่อขอรหัสผ่าน.");
      out.write("</p>");
      out.write("</div>");
      out.write("<div class=\"modal-footer\">");
      out.write("<button data-dismiss=\"modal\" class=\"btn btn-primary\" type=\"button\">");
      out.write("ตกลง");
      out.write("</button>");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("<script type=\"text/javascript\">");
      out.write("\n");
      out.write("\n");
      out.write("    var $altLoginFail = $('#_alert_login_fail_id'),\n");
      out.write("            $txtUsername = $('#j_username'),\n");
      out.write("            $divWrapper = $('#wrapper'),\n");
      out.write("            $divContainerLogin = $('#container_login'),\n");
      out.write("            $divSlideBar = $('#sidebar-wrapper');\n");
      out.write("\n");
      out.write("    $(document).ready(function () {\n");
      out.write("\n");
      out.write("      $(\".navbar-fixed-bottom\").fadeIn(1200);\n");
      out.write("\n");
      out.write("      $divContainerLogin.fadeIn(1200);\n");
      out.write("\n");
      out.write("      // Init Effect Material\n");
      out.write("      $.material.init();\n");
      out.write("\n");
      out.write("      // Remove Menu Panel Left\n");
      out.write("      $divWrapper.attr('id', '');\n");
      out.write("      $divSlideBar.remove();\n");
      out.write("\n");
      out.write("      // Display alert when login fail\n");
      out.write("      if (URLUtil.getParameterValue('login_error') == 'password' || URLUtil.getParameterValue('login_error') == 't') $altLoginFail.show();\n");
      out.write("\n");
      out.write("      // Focus Filed Username\n");
      out.write("      $txtUsername.focus();\n");
      out.write("\n");
      out.write("    });\n");
      out.write("\n");
      out.write("    ");
      out.write("</script>");
      out.write("</div>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_spring_url_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:url
    org.springframework.web.servlet.tags.UrlTag _jspx_th_spring_url_0 = (org.springframework.web.servlet.tags.UrlTag) _jspx_tagPool_spring_url_var_value_nobody.get(org.springframework.web.servlet.tags.UrlTag.class);
    _jspx_th_spring_url_0.setPageContext(_jspx_page_context);
    _jspx_th_spring_url_0.setParent(null);
    _jspx_th_spring_url_0.setVar("form_url");
    _jspx_th_spring_url_0.setValue("/resources/j_spring_security_check");
    int[] _jspx_push_body_count_spring_url_0 = new int[] { 0 };
    try {
      int _jspx_eval_spring_url_0 = _jspx_th_spring_url_0.doStartTag();
      if (_jspx_th_spring_url_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_url_0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_url_0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_url_0.doFinally();
      _jspx_tagPool_spring_url_var_value_nobody.reuse(_jspx_th_spring_url_0);
    }
    return false;
  }

  private boolean _jspx_meth_spring_url_1(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:url
    org.springframework.web.servlet.tags.UrlTag _jspx_th_spring_url_1 = (org.springframework.web.servlet.tags.UrlTag) _jspx_tagPool_spring_url_var_value_nobody.get(org.springframework.web.servlet.tags.UrlTag.class);
    _jspx_th_spring_url_1.setPageContext(_jspx_page_context);
    _jspx_th_spring_url_1.setParent(null);
    _jspx_th_spring_url_1.setVar("url_background");
    _jspx_th_spring_url_1.setValue("/resources/images/youtube-banner2.jpg");
    int[] _jspx_push_body_count_spring_url_1 = new int[] { 0 };
    try {
      int _jspx_eval_spring_url_1 = _jspx_th_spring_url_1.doStartTag();
      if (_jspx_th_spring_url_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_url_1[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_url_1.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_url_1.doFinally();
      _jspx_tagPool_spring_url_var_value_nobody.reuse(_jspx_th_spring_url_1);
    }
    return false;
  }

  private boolean _jspx_meth_spring_url_2(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:url
    org.springframework.web.servlet.tags.UrlTag _jspx_th_spring_url_2 = (org.springframework.web.servlet.tags.UrlTag) _jspx_tagPool_spring_url_var_value_nobody.get(org.springframework.web.servlet.tags.UrlTag.class);
    _jspx_th_spring_url_2.setPageContext(_jspx_page_context);
    _jspx_th_spring_url_2.setParent(null);
    _jspx_th_spring_url_2.setVar("url_scg_logo");
    _jspx_th_spring_url_2.setValue("/resources/images/logo.png");
    int[] _jspx_push_body_count_spring_url_2 = new int[] { 0 };
    try {
      int _jspx_eval_spring_url_2 = _jspx_th_spring_url_2.doStartTag();
      if (_jspx_th_spring_url_2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_url_2[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_url_2.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_url_2.doFinally();
      _jspx_tagPool_spring_url_var_value_nobody.reuse(_jspx_th_spring_url_2);
    }
    return false;
  }

  private boolean _jspx_meth_spring_message_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:message
    org.springframework.web.servlet.tags.MessageTag _jspx_th_spring_message_0 = (org.springframework.web.servlet.tags.MessageTag) _jspx_tagPool_spring_message_var_htmlEscape_code_nobody.get(org.springframework.web.servlet.tags.MessageTag.class);
    _jspx_th_spring_message_0.setPageContext(_jspx_page_context);
    _jspx_th_spring_message_0.setParent(null);
    _jspx_th_spring_message_0.setHtmlEscape("false");
    _jspx_th_spring_message_0.setVar("title");
    _jspx_th_spring_message_0.setCode("security_login_title");
    int[] _jspx_push_body_count_spring_message_0 = new int[] { 0 };
    try {
      int _jspx_eval_spring_message_0 = _jspx_th_spring_message_0.doStartTag();
      if (_jspx_th_spring_message_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_message_0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_message_0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_message_0.doFinally();
      _jspx_tagPool_spring_message_var_htmlEscape_code_nobody.reuse(_jspx_th_spring_message_0);
    }
    return false;
  }

  private boolean _jspx_meth_spring_message_1(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:message
    org.springframework.web.servlet.tags.MessageTag _jspx_th_spring_message_1 = (org.springframework.web.servlet.tags.MessageTag) _jspx_tagPool_spring_message_var_code_nobody.get(org.springframework.web.servlet.tags.MessageTag.class);
    _jspx_th_spring_message_1.setPageContext(_jspx_page_context);
    _jspx_th_spring_message_1.setParent(null);
    _jspx_th_spring_message_1.setVar("label_security_username");
    _jspx_th_spring_message_1.setCode("label_security_username");
    int[] _jspx_push_body_count_spring_message_1 = new int[] { 0 };
    try {
      int _jspx_eval_spring_message_1 = _jspx_th_spring_message_1.doStartTag();
      if (_jspx_th_spring_message_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_message_1[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_message_1.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_message_1.doFinally();
      _jspx_tagPool_spring_message_var_code_nobody.reuse(_jspx_th_spring_message_1);
    }
    return false;
  }

  private boolean _jspx_meth_spring_message_2(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:message
    org.springframework.web.servlet.tags.MessageTag _jspx_th_spring_message_2 = (org.springframework.web.servlet.tags.MessageTag) _jspx_tagPool_spring_message_var_code_nobody.get(org.springframework.web.servlet.tags.MessageTag.class);
    _jspx_th_spring_message_2.setPageContext(_jspx_page_context);
    _jspx_th_spring_message_2.setParent(null);
    _jspx_th_spring_message_2.setVar("label_security_password");
    _jspx_th_spring_message_2.setCode("label_security_password");
    int[] _jspx_push_body_count_spring_message_2 = new int[] { 0 };
    try {
      int _jspx_eval_spring_message_2 = _jspx_th_spring_message_2.doStartTag();
      if (_jspx_th_spring_message_2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_message_2[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_message_2.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_message_2.doFinally();
      _jspx_tagPool_spring_message_var_code_nobody.reuse(_jspx_th_spring_message_2);
    }
    return false;
  }

  private boolean _jspx_meth_spring_url_3(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  spring:url
    org.springframework.web.servlet.tags.UrlTag _jspx_th_spring_url_3 = (org.springframework.web.servlet.tags.UrlTag) _jspx_tagPool_spring_url_var_value_nobody.get(org.springframework.web.servlet.tags.UrlTag.class);
    _jspx_th_spring_url_3.setPageContext(_jspx_page_context);
    _jspx_th_spring_url_3.setParent(null);
    _jspx_th_spring_url_3.setVar("image_login_url");
    _jspx_th_spring_url_3.setValue("/resources/images/logo.png");
    int[] _jspx_push_body_count_spring_url_3 = new int[] { 0 };
    try {
      int _jspx_eval_spring_url_3 = _jspx_th_spring_url_3.doStartTag();
      if (_jspx_th_spring_url_3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_spring_url_3[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_spring_url_3.doCatch(_jspx_exception);
    } finally {
      _jspx_th_spring_url_3.doFinally();
      _jspx_tagPool_spring_url_var_value_nobody.reuse(_jspx_th_spring_url_3);
    }
    return false;
  }

  private boolean _jspx_meth_c_out_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_0 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value_nobody.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_0.setPageContext(_jspx_page_context);
    _jspx_th_c_out_0.setParent(null);
    _jspx_th_c_out_0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${label_security_username}", java.lang.Object.class, (PageContext)_jspx_page_context, null));
    int _jspx_eval_c_out_0 = _jspx_th_c_out_0.doStartTag();
    if (_jspx_th_c_out_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_c_out_value_nobody.reuse(_jspx_th_c_out_0);
      return true;
    }
    _jspx_tagPool_c_out_value_nobody.reuse(_jspx_th_c_out_0);
    return false;
  }

  private boolean _jspx_meth_c_out_1(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_1 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value_nobody.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_1.setPageContext(_jspx_page_context);
    _jspx_th_c_out_1.setParent(null);
    _jspx_th_c_out_1.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${label_security_password}", java.lang.Object.class, (PageContext)_jspx_page_context, null));
    int _jspx_eval_c_out_1 = _jspx_th_c_out_1.doStartTag();
    if (_jspx_th_c_out_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_c_out_value_nobody.reuse(_jspx_th_c_out_1);
      return true;
    }
    _jspx_tagPool_c_out_value_nobody.reuse(_jspx_th_c_out_1);
    return false;
  }
}
