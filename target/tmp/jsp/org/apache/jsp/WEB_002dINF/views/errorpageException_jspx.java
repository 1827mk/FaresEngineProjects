package org.apache.jsp.WEB_002dINF.views;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class errorpageException_jspx extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

static private org.apache.jasper.runtime.ProtectedFunctionMapper _jspx_fnmap_0;

static {
  _jspx_fnmap_0= org.apache.jasper.runtime.ProtectedFunctionMapper.getMapForFunction("fn:escapeXml", org.apache.taglibs.standard.functions.Functions.class, "escapeXml", new Class[] {java.lang.String.class});
}

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_spring_url_var_value_nobody;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_spring_url_var_value_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_spring_url_var_value_nobody.release();
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
      out.write("<style>");
      out.write("\n");
      out.write("\n");
      out.write("    .modal-dialog {\n");
      out.write("      padding-top:5%;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .popover {\n");
      out.write("      z-index: 9999;\n");
      out.write("      width: 100px;\n");
      out.write("    }\n");
      out.write("    .alert{\n");
      out.write("      background-color: tomato;\n");
      out.write("    }\n");
      out.write("    .add{\n");
      out.write("      background-color: green;\n");
      out.write("      text-align: center;\n");
      out.write("      color: white;\n");
      out.write("      height: 70px;\n");
      out.write("    }\n");
      out.write("\n");
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
      out.write("<div class=\"row\" />");
      out.write("</div>");
      out.write("<div data-backdrop=\"static\" data-keyboard=\"false\" class=\"modal fade\" id=\"alertModal\">");
      out.write("<div class=\"modal-dialog modal-sm\">");
      out.write("<div class=\"modal-content\">");
      out.write("<div class=\"modal-header alert\">");
      out.write("<center>");
      out.write("<label id=\"detailAlertHead\">");
      out.write("<center>");
      out.write("<span class=\"glyphicon glyphicon-info-sign\" />");
      out.write(" แจ้งเตือน");
      out.write("</center>");
      out.write("</label>");
      out.write("</center>");
      out.write("</div>");
      out.write("<div class=\"modal-body\">");
      out.write("<center>");
      out.write("<label id=\"detailAlert\" />");
      out.write("</center>");
      out.write("<center>");
      out.write("<label id=\"message\" />");
      out.write("</center>");
      out.write("</div>");
      out.write("<div class=\"modal-footer border\">");
      out.write("<center>");
      if (_jspx_meth_spring_url_2(_jspx_page_context))
        return;
      out.write("<a href=\"" + (java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${fn:escapeXml(re_url)}", java.lang.String.class, (PageContext)_jspx_page_context, _jspx_fnmap_0) + "\" />");
      out.write("<span>");
      out.write("<button class=\"btn btn-sm btn-primary\">");
      out.write("ตกลง");
      out.write("</button>");
      out.write("</span>");
      out.write("</center>");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("<script type=\"text/javascript\">");
      out.write("\n");
      out.write("    setTimeout(function() {\n");
      out.write("      $(\"#alertModal\").modal('show');\n");
      out.write("      $(\"label[id=detailAlert]\").text(\"พบข้อผิดพลาด ขออภัย!!\");\n");
      out.write("      $(\"label[id=message]\").text(\"(กดตกลง..เพื่อนำท่านกลับ)\");\n");
      out.write("    }, 3000);\n");
      out.write("  ");
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
    _jspx_th_spring_url_1.setValue("/resources/images/404-error-page.jpg");
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
    _jspx_th_spring_url_2.setVar("re_url");
    _jspx_th_spring_url_2.setValue("/#");
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
}
