<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml"
            omit-xml-declaration="yes"
            doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
            indent="no"/>
<xsl:variable name="title" select="/testsuite/@name"></xsl:variable>
<xsl:variable name="time" select="/testsuite/@time"></xsl:variable>
<xsl:variable name="errors" select="/testsuite/@errors"></xsl:variable>
<xsl:variable name="tests" select="/testsuite/@tests"></xsl:variable>
<xsl:variable name="skipped" select="/testsuite/@skipped"></xsl:variable>
<xsl:variable name="disabled" select="/testsuite/@disabled"></xsl:variable>
<xsl:variable name="failures" select="/testsuite/@failures"></xsl:variable>
<xsl:variable name="testsuitename" select="/testsuite/@name"></xsl:variable>
<xsl:variable name="succeeded" select="$tests - $errors - $skipped - $disabled - $failures"></xsl:variable>
<xsl:variable name="suiteid" select="/testsuite/@name"></xsl:variable>
<xsl:variable name="classname" select="/testsuite/testcase/@classname"></xsl:variable>
<xsl:template match="/">
<html>
      <head>
        <title><xsl:value-of select="$title"/></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta http-equiv="Expires" content="-1"/>
        <meta http-equiv="Pragma" content="no-cache"/>
        <link href="css/styles.css" rel="stylesheet"/>
        
<script>
<![CDATA[
  function toggleDetails(contentId, linkId) {
    var ele = document.getElementById(contentId);
    var text = document.getElementById(linkId);
    if(ele.style.display == "block") {
      ele.style.display = "none";
      text.innerHTML = "(Show Details)";
    }
    else {
      ele.style.display = "block";
      text.innerHTML = "(Hide Details)";
    }
  }

  function hideOpenInNewTabIfRequired() {
    if (top === self) { document.getElementById('printlink').style.display = 'none'; }
  }
]]>
</script>

      </head>
      <body class="specification">
        <div id="suite_header_name"><xsl:value-of select="$title"/></div>

          <xsl:choose>
              <xsl:when test="$failures &gt; 0">
                  <div id="suite_header_statistic_failed">
                      Tests: total <xsl:value-of select="$tests"/>, succeeded <xsl:value-of select="$succeeded"/>, failures <xsl:value-of select="$failures"/>, skipped <xsl:value-of select="$skipped"/>, disabled <xsl:value-of select="$disabled"/>, pending 0
                  </div>
              </xsl:when>
              <xsl:otherwise>
                  <div id="suite_header_statistic_passed">
                      Tests: total <xsl:value-of select="$tests"/>, succeeded <xsl:value-of select="$succeeded"/>, failures <xsl:value-of select="$failures"/>, skipped <xsl:value-of select="$skipped"/>, disabled <xsl:value-of select="$disabled"/>, pending 0
                  </div>
              </xsl:otherwise>
          </xsl:choose>

      <div id="71ec2559-a88a-48e8-9952-1b4418d44e16" class="scope" style="margin-left: 0px;">
      <xsl:value-of select="$testsuitename"/>
      </div>

    <xsl:for-each select="testsuite/testcase">
        <xsl:if test="skipped">
            <div id="263dcc5f-3b2a-49f6-9e15-68f8a8e5b838" class="test_canceled" style="margin-left: 0px;">
                <dl>
                    <dt><xsl:value-of select="@name"/></dt>
                </dl>
            </div>
        </xsl:if>
        <xsl:if test="not(skipped)">
            <div id="263dcc5f-3b2a-49f6-9e15-68f8a8e5b838" class="test_passed" style="margin-left: 0px;">
                <dl>
                    <dt><xsl:value-of select="@name"/></dt>
                </dl>
            </div>
        </xsl:if>
    </xsl:for-each>
        <table id="suite_footer">
          <tr id="suite_footer_id">
            <td id="suite_footer_id_label_passed">Suite ID</td>
            <td id="suite_footer_id_value" colspan="5"><xsl:value-of select="$suiteid"/></td>
          </tr>
          <tr id="suite_footer_class">
            <td id="suite_footer_class_label_passed">Class name</td>
            <td id="suite_footer_class_value" colspan="5"><xsl:value-of select="$classname"/></td>
          </tr>
          <tr id="suite_footer_duration">
            <td id="suite_footer_duration_label_passed">Total duration</td>
            <td id="suite_footer_duration_value" colspan="2">
              <xsl:value-of select="$time"/> milliseconds
              </td>
          </tr>
        </table>
      </body>
<script>
<![CDATA[
        hideOpenInNewTabIfRequired();
]]>
</script>
    </html>
</xsl:template>
</xsl:stylesheet>
