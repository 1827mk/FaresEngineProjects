package org.apache.jsp.WEB_002dINF.views;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class footer_jspx extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
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

      out.write("<div version=\"2.0\" id=\"footer\">");
      out.write("<nav style=\"display: none;height: 70px\" class=\"navbar navbar-material-grey-300 navbar-fixed-bottom navbar-footer-description\">");
      out.write("<div class=\"container-fluid\">");
      out.write("<div class=\"row\">");
      out.write("<div class=\"col-sm-12\">");
      out.write("<blockquote class=\"pull-right\" style=\"margin-top:0.5%\">");
      out.write("<strong>");
      out.write(" ระบบจัดการอัตรค่าโดยสาร");
      out.write("</strong>");
      out.write("<small style=\"color:#7f8c8d\">");
      out.write("ถนน พหลโยธิน 52., สายไหม, กรุงเทพ 12220, ประเทศไทย\n");
      out.write("              โทร. +666 000 0000");
      out.write("</small>");
      out.write("</blockquote>");
      out.write("</div>");
      out.write("</div>");
      out.write("</div>");
      out.write("</nav>");
      out.write("<script type=\"text/javascript\">");
      out.write("\n");
      out.write("    $(document).ready(function() {\n");
      out.write("\n");
      out.write("    });\n");
      out.write("\n");
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
}
