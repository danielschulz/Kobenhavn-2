define('jquery-wrapper',[],function(){return jQuery}),define('underscore-wrapper',['jquery-wrapper'],function(a){return _}),function(){var a=['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0'],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d=typeof location!='undefined'&&location.href,e=d&&location.protocol&&location.protocol.replace(/\:/,''),f=d&&location.hostname,g=d&&(location.port||undefined),h=[];define('text',[],function(){var i,j;return i={version:'1.0.8',strip:function(a){if(a){a=a.replace(b,'');var d=a.match(c);d&&(a=d[1])}else a='';return a},jsEscape:function(a){return a.replace(/(['\\])/g,'\\$1').replace(/[\f]/g,'\\f').replace(/[\b]/g,'\\b').replace(/[\n]/g,'\\n').replace(/[\t]/g,'\\t').replace(/[\r]/g,'\\r')},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!='undefined')return new XMLHttpRequest;if(typeof ActiveXObject!='undefined')for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}return b},parseName:function(a){var b=!1,c=a.indexOf('.'),d=a.substring(0,c),e=a.substring(c+1,a.length);return c=e.indexOf('!'),c!==-1&&(b=e.substring(c+1,e.length),b=b==='strip',e=e.substring(0,c)),{moduleName:d,ext:e,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,c,d){var e=i.xdRegExp.exec(a),f,g,h;return e?(f=e[2],g=e[3],g=g.split(':'),h=g[1],g=g[0],(!f||f===b)&&(!g||g===c)&&(!h&&!g||h===d)):!0},finishLoad:function(a,b,c,d,e){c=b?i.strip(c):c,e.isBuild&&(h[a]=c),d(c)},load:function(a,b,c,h){if(h.isBuild&&!h.inlineText){c();return}var j=i.parseName(a),k=j.moduleName+'.'+j.ext,l=b.toUrl(k),m=h&&h.text&&h.text.useXhr||i.useXhr;!d||m(l,e,f,g)?i.get(l,function(b){i.finishLoad(a,j.strip,b,c,h)}):b([k],function(a){i.finishLoad(j.moduleName+'.'+j.ext,j.strip,a,c,h)})},write:function(a,b,c,d){if(h.hasOwnProperty(b)){var e=i.jsEscape(h[b]);c.asModule(a+'!'+b,'define(function () { return \''+e+'\';});\n')}},writeFile:function(a,b,c,d,e){var f=i.parseName(b),g=f.moduleName+'.'+f.ext,h=c.toUrl(f.moduleName+'.'+f.ext)+'.js';i.load(g,c,function(b){var c=function(a){return d(h,a)};c.asModule=function(a,b){return d.asModule(a,h,b)},i.write(a,g,c,e)},e)}},i.createXhr()?i.get=function(a,b){var c=i.createXhr();c.open('GET',a,!0),c.onreadystatechange=function(a){c.readyState===4&&b(c.responseText)},c.send(null)}:typeof process!='undefined'&&process.versions&&!!process.versions.node?(j=require.nodeRequire('fs'),i.get=function(a,b){var c=j.readFileSync(a,'utf8');c.indexOf('﻿')===0&&(c=c.substring(1)),b(c)}):typeof Packages!='undefined'&&(i.get=function(a,b){var c='utf-8',d=new java.io.File(a),e=java.lang.System.getProperty('line.separator'),f=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),c)),g,h,i='';try{g=new java.lang.StringBuffer,h=f.readLine(),h&&h.length()&&h.charAt(0)===65279&&(h=h.substring(1)),g.append(h);while((h=f.readLine())!==null)g.append(e),g.append(h);i=String(g.toString())}finally{f.close()}b(i)}),i})}(),define('text!templates/projectview/buyer-reputation-box.htm',[],function(){return'<div class="span8 margin-0 padding-b5" style="border-bottom: 1px dotted #CCC;">\n    <div class="tip" style="left:81%"></div>\n    <div class="tip-bg"></div>\n    <div class="span3 margin-10">\n        <% if (typeof hideEmployer == \'undefined\' || hideEmployer == false) { %>\n        <img src="<%= reputationInfo.profile.logo %>" height="40" width="40">\n        <a href="<%- \'/users/profile.php?id=\' + reputationInfo.profile.id %>" target="_blank" class="bold link_color">\n            <%- reputationInfo.profile.name %>\n        </a>\n        <% } %>\n    </div>\n    <div class="span5 align-r right margin-10 padding-t10">\n        <span><%= T_("Filter by:")%></span>\n        <span class="badge small normal period-selector <% if (period == \'last3months\') { %> badge-info <% } %>" period="last3months"><%= T_("Past 3 Months")%></span>\n        <span class="badge small normal period-selector <% if (period == \'last12months\') { %> badge-info <% } %>" period="last12months"><%= T_("12 Months")%></span>\n        <span class="badge small normal period-selector <% if (period == \'entire_history\') { %> badge-info <% } %>" period="entire_history"><%= T_("All")%></span>\n    </div>\n</div>\n<div class="span8 margin-0" style="border-bottom: 1px dotted #CCC;">\n    <div class="span4 margin-10 padding-t10">\n        <span class="margin-r10 bold"><%= T_("Average Rating")%></span>\n        <span class="right"><%= reputationInfo.rep[period].overall.toFixed(1) %></span>\n        <dl class="rating-wrap on-page-display margin-0 right margin-r10">\n            <dt class="active-stars" style="width:<%= reputationInfo.rep[period].overall * 20 %>%">\n            </dt>\n            <dd class="empty-stars">\n            </dd>\n        </dl>\n    </div>\n    <div class="span4 right margin-10">\n        <div class="span4 margin-0 bold">\n            <span>\n                <%= T_("Reviews")%>\n            </span>\n            <% if (reputationInfo.rep[period].count_all_reviews) { %>\n                <span class="right">\n                    <% if (typeof hideEmployer == \'undefined\' || hideEmployer == false) { %>\n                    <a href="<%= \'/users/profile.php?id=\' + reputationInfo.profile.id %>"><%= reputationInfo.rep[period].count_all_reviews  %></a>\n                    <% } else { %>\n                    <span><%= reputationInfo.rep[period].count_all_reviews  %></span>\n                    <% } %>\n                </span>\n            <% } else { %>\n                <span class="right">0</span>\n            <% } %>\n        </div>\n        <div class="span4 margin-0 bold">\n            <span><%= T_("Total Projects")%></span>\n            <% if (reputationInfo.rep[period].total) { %>\n                <span class="right"><%= reputationInfo.rep[period].total %></span>\n            <% } else { %>\n                <span class="right">0</span>\n            <% } %>\n        </div>\n    </div>\n</div>\n<div class="span8 margin-0">\n    <div class="span4 padding-10 padding-r10 margin-0" style="border-right: 1px dotted #CCC;">\n        <div class="span4 margin-0 margin-t10 margin-b10">\n            <span><%= T_("Clarify in Specification")%></span>\n            <span class="right"><%= reputationInfo.rep[period].cla.toFixed(1) %></span>\n            <dl class="rating-wrap on-page-display margin-0 right margin-r10">\n                <dt class="active-stars" style="width:<%= reputationInfo.rep[period].cla * 20 %>%">\n                </dt>\n                <dd class="empty-stars">\n                </dd>\n            </dl>\n        </div>\n        <div class="span4 margin-0 margin-b10">\n            <span><%= T_("Communication")%></span>\n            <span class="right"><%= reputationInfo.rep[period].com.toFixed(1) %></span>\n            <dl class="rating-wrap on-page-display margin-0 right margin-r10">\n                <dt class="active-stars" style="width:<%= reputationInfo.rep[period].com * 20 %>%">\n                </dt>\n                <dd class="empty-stars">\n                </dd>\n            </dl>\n        </div>\n        <div class="span4 margin-0 margin-b10">\n            <span><%= T_("Payment Promptness")%></span>\n            <span class="right"><%= reputationInfo.rep[period].pay.toFixed(1) %></span>\n            <dl class="rating-wrap on-page-display margin-0 right margin-r10">\n                <dt class="active-stars" style="width:<%= reputationInfo.rep[period].pay * 20 %>%">\n                </dt>\n                <dd class="empty-stars">\n                </dd>\n            </dl>\n        </div>\n        <div class="span4 margin-0 margin-b10">\n            <span><%= T_("Professionalism")%></span>\n            <span class="right"><%= reputationInfo.rep[period].pro.toFixed(1) %></span>\n            <dl class="rating-wrap on-page-display margin-0 right margin-r10">\n                <dt class="active-stars" style="width:<%= reputationInfo.rep[period].pro * 20 %>%">\n                </dt>\n                <dd class="empty-stars">\n                </dd>\n            </dl>\n        </div>\n        <div class="span4 margin-0 margin-b10">\n            <span><%= T_("Would Work for Again")%></span>\n            <span class="right"><%= reputationInfo.rep[period].wag.toFixed(1) %></span>\n            <dl class="rating-wrap on-page-display margin-0 right margin-r10">\n                <dt class="active-stars" style="width:<%= reputationInfo.rep[period].wag * 20 %>%">\n                </dt>\n                <dd class="empty-stars">\n                </dd>\n            </dl>\n        </div>\n    </div>\n    <div class="span4 padding-10 padding-l5 margin-0 right">\n        <div class="span4 margin-0">\n            <div class="span2 margin-0 margin-t10"><%= T_("Open Projects")%></div>\n            <span class="right"><%= reputationInfo.rep[period].totalOpen %></span>\n        </div>\n        <div class="span4 margin-0">\n            <div class="span2 margin-0 margin-t10"><%= T_("Active Projects")%></div>\n            <span class="right"><%= reputationInfo.rep[period].totalActive %></span>\n        </div>\n        <div class="span4 margin-0">\n            <div class="span2 margin-0 margin-t10"><%= T_("Closed Projects")%></div>\n            <span class="right"><%= reputationInfo.rep[period].totalCompleted %></span>\n        </div>\n    </div>\n</div>\n'}),define('text!templates/users/posted-by/posted-by.htm',[],function(){return'<div class="align-c inline-block">\n    <img src="<%- owner_profile_logo_url %>"\n    class="thumbnail <%- owner_online %>"\n    alt="Hire <%- owner_username %>">\n    <% if (!isOwner) { %>\n        <button class="btn btn-mini margin-t5 bold align-c follow-btn"\n        data-user-id="<%- owner_id %>" data-action="on">\n            <i></i>\n            <span class="bold"><%- T_("Follow") %></span>\n        </button>\n    <% } %>\n</div>\n<div class="user-wrap">\n    <div class="posted-by-title bold margin-b5">\n    </div>\n    <div class="margin-b5 relative">\n        <% if (owner_online == \'online\') { %>\n            <span class="custom-icon online status margin-r5"></span>\n            <div class="online-status-detail span2 custom-hover left padding-0 well black white" style="display:none;">\n                <div class="tip"></div>\n                <div class="pad">\n                    <span class="align-l"><%- T_("Online now") %></span>\n                </div>\n            </div>\n        <% } else { %>\n            <span class="custom-icon offline status margin-r5"></span>\n            <div class="online-status-detail span4 custom-hover left padding-0 well black white" style="display:none;">\n                <div class="tip"></div>\n                <div class="pad">\n                    <span class="align-l"><%- T_("Last seen:") %> <%- owner_lastlogindate %></span>\n                </div>\n            </div>\n        <% } %>\n        <span class="margin-r5 bold">\n            <a onclick="javascript:_ttref.push([\'_setCookie\',\'HireMe_PVBuyer\']);" href="/u/<%- owner_username %>.html" target="_blank">\n                <%- owner_username %>\n            </a>\n        </span>\n        <span class="margin-r5 user-flag user-icons">\n            <img src="<%- owner_flagIcon %>" alt="<%- owner_flagName %>" title="<%- owner_flagName %>">\n        </span>\n    </div>\n    <div class="margin-b5">\n        <div class="buyer-reputation-stars left">\n            <dl class="rating-wrap on-page-display margin-0">\n                <dt class="active-stars" width>\n                </dt>\n                <dd class="empty-stars">\n                </dd>\n            </dl>\n            <div class="span8 padding-0 buyer-reputation-container well white align-l custom-hover black top" style="display:none;">\n            </div>\n        </div>\n        <span class="small margin-l5 left">\n            <a href=\'/users/profile.php?id=<%- owner_id %>\'\n            data-user-id="<%- owner_id %>" class="showdataemployer">\n                <span class="bold">\n                    <%- owner_buyer_rating_avg %>\n                </span>\n                <span>\n                    &nbsp;\n                    <% if (owner_buyer_rating_count == 1) { %>\n                        <%- T_("1 Review") %>\n                    <% } else { %>\n                        <%- T_("<[- num ]> Reviews", {num: owner_buyer_rating_count}) %>\n                    <% } %>\n                </span>\n            </a>\n        </span>\n    </div>\n    <div class="margin-b5 clear">\n        <span class="verified-payment margin-t5 <%- owner_verified %>">\n            <span class="custom-icon badge-icon"></span>\n            <span class="tab"><%- T_("Verified") %></span>\n            <div class="verified-payment_tip span3 custom-hover left padding-0 well black white left">\n                <div class="relative">\n                    <div class="tip"></div>\n                    <div class="pad">\n                        <span align="left margin-b0">\n                            <% if (owner_verified != \'disabled\') { %>\n                                <%- T_("This user has verified their Payment method") %>\n                            <% } else { %>\n                                <%- T_("This user has not yet verified their Payment method") %>\n                            <% } %>\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </span>\n    </div>\n</div>\n'}),define('users/profile/modulePostedBy',['jquery-wrapper','underscore-wrapper','text!templates/projectview/buyer-reputation-box.htm','text!templates/users/posted-by/posted-by.htm'],function(a,b,c,d){function i(c){f=c.item,e=c.owner,g=c.title;var h=b.template(d,{owner_id:e.id,owner_username:e.username,owner_profile_logo_url:e.profile_logo_url,owner_online:e.online,owner_lastlogindate:e.lastlogindate,owner_verified:e.verified,owner_flagIcon:e.flagIcon,owner_flagName:e.flagName,owner_buyer_rating_avg:e.buyer_rating_avg,owner_buyer_rating_count:e.buyer_rating_count,isOwner:c.isOwner});a('.posted-by-box').append(h),a('.posted-by-title').text(g),j(),l(),a('.verified-payment').on('mouseover',function(){a('.verified-payment_tip').show()}),a('.verified-payment').on('mouseout',function(){a('.verified-payment_tip').hide()}),a('.custom-icon.status').on('mouseover',function(){a('.online-status-detail').show()}),a('.custom-icon.status').on('mouseout',function(){a('.online-status-detail').hide()}),a('.buyer-reputation-stars').on('mouseenter',function(){a('.buyer-reputation-container').is(':visible')||(k(),a('.buyer-reputation-container').show())}).on('mouseleave',function(){a('.buyer-reputation-container').delay(500).hide(0)}),a('.buyer-reputation-stars').on('click','.buyer-reputation-container .period-selector',function(){a(this).siblings('.period-selector').removeClass('badge-info'),a(this).addClass('badge-info'),k(),a('.buyer-reputation-container').show()})}function j(){var b=e.buyer_rating_avg*20;a('.buyer-reputation-stars .on-page-display .active-stars').css('width',b+'%')}function k(){var d=a('.buyer-reputation-container'),f=d.find('.period-selector.badge-info').attr('period');if(h=='loading')return!1;if(h)return d.html(a(b.template(c,{reputationInfo:h,period:f}))),!0;var g={user_id:e.id};a.ajax({type:'get',url:'/ajax/reputation-employer-on-hover-content.php',data:g,dataType:'json',beforeSend:function(){h='loading',d.html(loading_html()),a('<div class="tip" style="left:81%"></div><div class="tip-bg"></div>').prependTo(d)},complete:function(){d.find('.loadingImage').remove()},success:function(e){h=e,d.html(a(b.template(c,{reputationInfo:e,period:'entire_history'})))},error:function(){h=!1}})}function l(){var b=a('.bookmark-btn'),c=a('.follow-btn');a.ajax({type:'post',url:'/ajax/project/getWatchStatus.php',dataType:'json',data:{project_id:f.id,buyer_id:e.id},success:function(a){a&&a.project_watch_status?(b.text(T_('unbook this contest')),b.addClass('selected').data('action','off')):(b.text(T_('book this contest')),b.removeClass('selected').data('action','on')),a&&a.employer_watch_status?(c.data('action','off'),c.children('span').text(T_('Following')),c.addClass('btn-success'),c.children('i').addClass('icon-ok-sign').removeClass('icon-plus-sign, icon-remove-sign')):(c.data('action','on'),c.children('i').addClass('icon-plus-sign').removeClass('icon-ok-sign, icon-remove-sign'))}})}var e,f,g,h=!1;return{init:i}})