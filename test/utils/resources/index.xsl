<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="title" select="'aiq-ui Tests'"></xsl:variable>
<xsl:variable name="time" select="sum(/testsuites/testsuite/@time)"></xsl:variable>
<xsl:variable name="errors" select="sum(/testsuites/testsuite/@errors)"></xsl:variable>
<xsl:variable name="tests" select="sum(/testsuites/testsuite/@tests)"></xsl:variable>
<xsl:variable name="skipped" select="sum(/testsuites/testsuite/@skipped)"></xsl:variable>
<xsl:variable name="disabled" select="sum(/testsuites/testsuite/@disabled)"></xsl:variable>
<xsl:variable name="failures" select="sum(/testsuites/testsuite/@failures)"></xsl:variable>
<xsl:variable name="suites" select="count(/testsuites/testsuite)"></xsl:variable>
<xsl:variable name="succeeded" select="$tests - $errors - $skipped - $disabled - $failures"></xsl:variable>

<xsl:template match="/">
<html>
      <head>
        <title>aiq-ui Results</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta http-equiv="Expires" content="-1"/>
        <meta http-equiv="Pragma" content="no-cache"/>
        <link href="css/styles.css" rel="stylesheet"/>
        <script type="text/javascript" src="js/d3.v2.min.js"></script>
        <script type="text/javascript" src="js/sorttable.js"></script>
<script>
<![CDATA[
var SUCCEEDED_BIT = 1;
var FAILURES_BIT = 2;
var SKIPPED_BIT = 4;
var PENDING_BIT = 8;
var DISABLED_BIT = 16;
function showDetails(suiteName) {
  document.getElementById('details_view').innerHTML = "<iframe src='" + suiteName + ".xml' width='100%' height='100%'></iframe>";
}
function resizeDetailsView() {
  var headerView = document.getElementById('scalatest-header');
  var detailsView = document.getElementById('details_view');
  var summaryView = document.getElementById('summary_view');
  var left = summaryView.offsetWidth + 30;
  detailsView.style.left = left + "px";
  detailsView.style.width = (window.innerWidth - left - 30) + "px";
  detailsView.style.height = (window.innerHeight - headerView.offsetHeight - 20) + "px";
}
]]>
</script>
      </head>
      <body onresize="resizeDetailsView()">
        <div class="scalatest-report">
          <div id="scalatest-header" class="scalatest-header-passed">
      <div id="title">
      <xsl:value-of select="$title"/>
      </div>

      <div id="summary">
        <p id="duration">Run completed in <xsl:value-of select="$time"/>  milliseconds.</p>
        <p id="totalTests">Total number of tests run: <xsl:value-of select="$tests"/></p>
        <p id="suiteSummary">Suites: completed <xsl:value-of select="$suites"/>, aborted 0</p>
        <p id="testSummary">Tests: succeeded <xsl:value-of select="$succeeded"/>, errors <xsl:value-of select="$errors"/>, failures <xsl:value-of select="$failures"/>, skipped <xsl:value-of select="$skipped"/>, disabled <xsl:value-of select="$disabled"/>, pending 0</p>
      </div>
    </div>
          <table id="summary_view">
            <tr id="summary_view_row_1">
              <td id="summary_view_row_1_chart">
                <div id="chart_div"></div>
              </td>
              <td id="summary_view_row_1_legend">
                <table id="summary_view_row_1_legend_table">
                  <tr id="summary_view_row_1_legend_table_row_succeeded">
                    <td id="summary_view_row_1_legend_succeeded_label">Succeeded</td>
                    <td id="summary_view_row_1_legend_succeeded_count"><xsl:value-of select="$succeeded"/></td>
                    <td id="summary_view_row_1_legend_succeeded_percent">(<xsl:value-of select='format-number($succeeded div $tests, "#.##")'/>%)</td>
                  </tr>
                  <tr id="summary_view_row_1_legend_table_row_failed">
                    <td id="summary_view_row_1_legend_failed_label">Failures</td>
                    <td id="summary_view_row_1_legend_failed_count"><xsl:value-of select="$failures"/></td>
                    <td id="summary_view_row_1_legend_failed_percent">(<xsl:value-of select='format-number($failures div $tests, "#.##")'/>%)</td>
                  </tr>
                  <tr id="summary_view_row_1_legend_table_row_canceled">
                    <td id="summary_view_row_1_legend_canceled_label">Skipped</td>
                    <td id="summary_view_row_1_legend_canceled_count"><xsl:value-of select="$skipped"/></td>
                    <td id="summary_view_row_1_legend_canceled_percent">(<xsl:value-of select='format-number($skipped div $tests, "#.##")'/>%)</td>
                  </tr>
                  <tr id="summary_view_row_1_legend_table_row_ignored">
                    <td id="summary_view_row_1_legend_ignored_label">Disabled</td>
                    <td id="summary_view_row_1_legend_ignored_count"><xsl:value-of select="$disabled"/></td>
                    <td id="summary_view_row_1_legend_ignored_percent">(<xsl:value-of select='format-number($disabled div $tests, "#.##")'/>%)</td>
                  </tr>
                  <tr id="summary_view_row_1_legend_table_row_pending">
                    <td id="summary_view_row_1_legend_pending_label">Pending</td>
                    <td id="summary_view_row_1_legend_pending_count">0</td>
                    <td id="summary_view_row_1_legend_pending_percent">(0%)</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr id="summary_view_row_2">
              <td id="summary_view_row_2_results" colspan="2">
                <div id="display-filters">
    <!--
      <input id="succeeded_checkbox" name="succeeded_checkbox" type="checkbox" checked="checked" onchange="applyFilter()"/> <label id="succeeded_checkbox_label" for="passed_checkbox">Succeeded</label>
      <input id="failed_checkbox" name="failed_checkbox" type="checkbox" checked="checked" onchange="applyFilter()"/> <label id="failed_checkbox_label" for="failed_checkbox">Failed</label>
      <input id="canceled_checkbox" name="canceled_checkbox" type="checkbox" checked="checked" onchange="applyFilter()"/> <label id="canceled_checkbox_label" for="canceled_checkbox">Canceled</label>
      <input id="ignored_checkbox" name="ignored_checkbox" type="checkbox" checked="checked" onchange="applyFilter()"/> <label id="ignored_checkbox_label" for="ignored_checkbox">Ignored</label>
      <input id="pending_checkbox" name="pending_checkbox" type="checkbox" checked="checked" onchange="applyFilter()"/> <label id="pending_checkbox_label" for="pending_checkbox">Pending</label>
    -->
    </div>
    <table class="sortable">
      <tr>
        <td>Suite</td>
        <td>Duration (ms.)</td>
        <td>Succeeded</td>
        <td>Failed</td>
        <td>Skipped</td>
        <td>Disabled</td>
        <td>Pending</td>
        <td>Total</td>
      </tr>

      <xsl:for-each select="testsuites/testsuite">
        <xsl:variable name="filenum" select="position()"/>
        <tr>
          <td class="suite_name_passed"><a href="javascript: showDetails('suite{$filenum}');"><xsl:value-of select="@name"/></a></td>
          <td class="duration_passed"><xsl:value-of select="@time"/></td>

          <xsl:if test="(@tests - @errors - @skipped - @disabled - @failures) &gt; 0 ">
            <td class="succeeded"><xsl:value-of select="@tests - @errors - @skipped - @disabled - @failures"/></td>
          </xsl:if>
          <xsl:if test="(@tests - @errors - @skipped - @disabled - @failures) = 0 ">
            <td class="succeeded_zero"><xsl:value-of select="@tests - @errors - @skipped - @disabled - @failures"/></td>
          </xsl:if>

          <xsl:if test="@failures &gt; 0 ">
            <td class="failed"><xsl:value-of select="@failures"/></td>
          </xsl:if>
          <xsl:if test="@failures = 0 ">
            <td class="failed_zero"><xsl:value-of select="@failures"/></td>
          </xsl:if>

          <xsl:if test="@skipped &gt; 0 ">
            <td class="canceled"><xsl:value-of select="@skipped"/></td>
          </xsl:if>
          <xsl:if test="@skipped = 0 ">
            <td class="canceled_zero"><xsl:value-of select="@skipped"/></td>
          </xsl:if>

          <xsl:if test="@disabled &gt; 0 ">
            <td class="ignored"><xsl:value-of select="@disabled"/></td>
          </xsl:if>
          <xsl:if test="@disabled = 0 ">
            <td class="ignored_zero"><xsl:value-of select="@disabled"/></td>
          </xsl:if>

          <td class="pending_zero">0</td>

          <xsl:if test="@failures &gt; 0 ">
            <td class="total_with_failed"><xsl:value-of select="@tests"/></td>
          </xsl:if>
          <xsl:if test="@failures = 0 ">
            <td class="total_passed"><xsl:value-of select="@tests"/></td>
          </xsl:if>
        </tr>
      </xsl:for-each>
    </table>
</td>
</tr>
</table>
<div id="details_view">
<span id="aaa">Click on suite name to view details</span>
</div>
        </div>
<script>
<![CDATA[
function getBgColor(elementId)
{
  var element = document.getElementById(elementId);
  if (element.currentStyle)
    return element.currentStyle.backgroundColor;
  if (window.getComputedStyle)
  {
    var elementStyle=window.getComputedStyle(element,"");
    if (elementStyle)
      return elementStyle.getPropertyValue("background-color");
  }
  // Return 0 if both methods failed.
  return 0;
}

var data = [313, 0, 2, 0, 0];
var color = [getBgColor('summary_view_row_1_legend_succeeded_label'),
             getBgColor('summary_view_row_1_legend_failed_label'),
             getBgColor('summary_view_row_1_legend_ignored_label'),
             getBgColor('summary_view_row_1_legend_pending_label'),
             getBgColor('summary_view_row_1_legend_canceled_label')
            ];
var width = document.getElementById('chart_div').offsetWidth,
    height = document.getElementById('chart_div').offsetHeight,
    outerRadius = Math.min(width, height) / 2,
    innerRadius = 0,
    donut = d3.layout.pie(),
    arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
var vis = d3.select("#chart_div")
            .append("svg")
            .data([data])
            .attr("width", width)
            .attr("height", height);
var arcs = vis.selectAll("g.arc")
              .data(donut)
              .enter().append("g")
              .attr("class", "arc")
              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
arcs.append("path")
    .attr("fill", function(d, i) { return color[i]; })
    .attr("d", arc);
]]>
</script>

<script>
<![CDATA[
          resizeDetailsView();
]]>
</script>

      </body>
</html>
</xsl:template>
</xsl:stylesheet>
