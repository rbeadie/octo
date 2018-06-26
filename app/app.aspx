<%-- _lcid="1033" _version="16.0.4266" _dal="1" --%>
    <%-- _LocalBinding --%>
    <%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document"  %>
    <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
    <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
    <%@ Import Namespace="Microsoft.SharePoint" %>
    <%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
    <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

    <asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
        <SharePoint:ListItemProperty Property="BaseName" maxlength="40" runat="server" />
    </asp:Content>
    <asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
		<meta name="GENERATOR" content="Microsoft SharePoint" />
		<meta name="ProgId" content="SharePoint.WebPartPage.Document" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="CollaborationServer" content="SharePoint Team Web Site" />
		<SharePoint:StyleBlock runat="server">
			body #s4-leftpanel { display:none; } 
			.s4-ca { margin-left:0px; }
		</SharePoint:StyleBlock>
    </asp:Content>

    <asp:Content ContentPlaceHolderId="PlaceHolderSearchArea" runat="server">
        <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
    </asp:Content>
    <asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">
        <SharePoint:ProjectProperty Property="Description" runat="server"/>
    </asp:Content>
    <asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
        <!-- BUILD_INCLUDE("<%= buildTempFolder %>/appLoad.html") -->
        @@include('app.html')
            
        <script type="text/javascript">
            // @@include('vendor-min.js')
        </script>
        <script type="text/javascript">
            // @@include('app-min.js')
        </script>
        <style>
            @@include('app.css')
        </style> 
    </asp:Content>