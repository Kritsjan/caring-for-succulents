<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap - Caring for Succulents</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: 'Poppins', sans-serif;
                        font-size: 14px;
                        color: #333333;
                        background: #f7f7f7;
                        margin: 0;
                        padding: 20px;
                    }
                    #content {
                        max-width: 1200px;
                        margin: 0 auto;
                        background: white;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #2c3e50;
                        font-size: 24px;
                        font-weight: bold;
                        margin: 0 0 20px 0;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 20px 0;
                    }
                    th {
                        background-color: #34495e;
                        color: white;
                        text-align: left;
                        padding: 12px;
                        font-weight: 600;
                    }
                    td {
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                    }
                    tr:hover {
                        background-color: #f9f9f9;
                    }
                    a {
                        color: #3498db;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .priority-high {
                        background-color: #e74c3c;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                    }
                    .priority-medium {
                        background-color: #f39c12;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                    }
                    .priority-low {
                        background-color: #27ae60;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                    }
                </style>
            </head>
            <body>
                <div id="content">
                    <h1>XML Sitemap - Caring for Succulents</h1>
                    <p>This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.</p>
                    <table>
                        <tr>
                            <th>URL</th>
                            <th>Last Modified</th>
                            <th>Change Frequency</th>
                            <th>Priority</th>
                        </tr>
                        <xsl:for-each select="sitemap:urlset/sitemap:url">
                            <tr>
                                <td>
                                    <a href="{sitemap:loc}">
                                        <xsl:value-of select="sitemap:loc"/>
                                    </a>
                                </td>
                                <td><xsl:value-of select="sitemap:lastmod"/></td>
                                <td><xsl:value-of select="sitemap:changefreq"/></td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="sitemap:priority >= 0.8">
                                            <span class="priority-high">
                                                <xsl:value-of select="sitemap:priority"/>
                                            </span>
                                        </xsl:when>
                                        <xsl:when test="sitemap:priority >= 0.5">
                                            <span class="priority-medium">
                                                <xsl:value-of select="sitemap:priority"/>
                                            </span>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <span class="priority-low">
                                                <xsl:value-of select="sitemap:priority"/>
                                            </span>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
