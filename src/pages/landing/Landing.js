import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Language as LanguageIcon,
  PlayArrow as PlayArrowIcon,
  FlashOn as LightningIcon,
  CenterFocusStrong as TargetIcon,
  AllInclusive as InfinityIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Description as DescriptionIcon,
  VideoLibrary as VideoLibraryIcon,
  Analytics as AnalyticsIcon,
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpeg";

// Mock icons for the features section if specific ones aren't available
const FastIcon = () => <Box sx={{ backgroundColor: '#F5F5F5', p: 1, borderRadius: '50%', display: 'inline-flex' }}><LightningIcon sx={{ color: '#000000' }} /></Box>;
const ReliableIcon = () => <Box sx={{ backgroundColor: '#F5F5F5', p: 1, borderRadius: '50%', display: 'inline-flex' }}><TargetIcon sx={{ color: '#000000' }} /></Box>;
const UnlimitedIcon = () => <Box sx={{ backgroundColor: '#F5F5F5', p: 1, borderRadius: '50%', display: 'inline-flex' }}><InfinityIcon sx={{ color: '#000000' }} /></Box>;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const sectionStyles = {
    py: { xs: 8, md: 15 },
    px: { xs: 2, md: 0 }
  };

  const cardStyles = {
    height: "100%",
    p: 4,
    borderRadius: 4,
    border: "1px solid #EEEEEE",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
      transform: "translateY(-5px)",
      borderColor: "transparent"
    }
  };

  const titleStyles = {
    fontWeight: 800,
    mb: 2,
    letterSpacing: "-0.02em",
    lineHeight: 1.2
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#FFFFFF", color: "#1A1A1A", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: "rgba(255, 255, 255, 0.8)", 
          backdropFilter: "blur(20px)",
          color: "black", 
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: 1100
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", height: { xs: 70, md: 80 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src={logo} sx={{ height: 32, mr: 1.5, borderRadius: 1 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 800, color: "#000000", letterSpacing: "-0.5px" }}>
                LeoEd
              </Typography>
              <Box sx={{ display: { xs: "none", lg: "flex" }, ml: 6 }}>
                {["首頁", "各科 AI", "合作學校", "收費方案", "智啟學教", "聯繫我們"].map((text) => (
                  <Button key={text} sx={{ color: "text.secondary", px: 2, fontWeight: 600, fontSize: "0.95rem", textTransform: "none", "&:hover": { color: "#000000" } }}>
                    {text} {text === "各科 AI" && <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button startIcon={<LanguageIcon />} sx={{ color: "text.secondary", mr: 1, display: { xs: "none", sm: "flex" }, fontWeight: 600 }}>
                繁體
              </Button>
              <Button 
                variant="contained" 
                onClick={handleLogin}
                sx={{ 
                  textTransform: "none", 
                  borderRadius: "12px", 
                  bgcolor: "#2196f3", 
                  color: "white", 
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  boxShadow: "0 4px 14px 0 rgba(33,150,243,0.39)",
                  '&:hover': { bgcolor: '#1976d2', boxShadow: "0 6px 20px rgba(33,150,243,0.23)" } 
                }}
              >
                學校師生登入
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  display: { xs: "none", md: "flex" },
                  textTransform: "none", 
                  borderRadius: "12px", 
                  bgcolor: "#000000", 
                  color: "#FFFFFF", 
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
                  '&:hover': { bgcolor: '#222222' } 
                }}
              >
                立即試用
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        pt: { xs: 10, md: 15 }, 
        pb: { xs: 10, md: 20 }, 
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(circle at 70% 30%, rgba(33,150,243,0.05) 0%, rgba(255,255,255,0) 60%)"
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <Typography component="span" sx={{ 
                  bgcolor: "rgba(0,0,0,0.05)", 
                  color: "#000000", 
                  px: 2, 
                  py: 1, 
                  borderRadius: "50px", 
                  fontSize: "0.85rem", 
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1
                }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: "#4CAF50", borderRadius: "50%" }} />
                  DSE • TSA • HKAT • IELTS 專業評核對標
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ ...titleStyles, fontSize: { xs: "2.5rem", md: "3.75rem" } }}>
                LeoEd AI：<br />
                <Box component="span" sx={{ 
                  background: "linear-gradient(90deg, #000000 0%, #2196f3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>引領自適應學習的未來</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "90%" }}>
                打破傳統「一刀切」的教學模式。LeoEd AI 是一個動態學習環境，透過持續收集學生的表現數據，為學習內容進行個性化定制、調整難度，並提供即時、具針對性的反饋。
              </Typography>
              <Box sx={{ mb: 6, display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#000000", fontWeight: 700, fontSize: "0.95rem" }}>
                    可靠的 AI 引航者
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#000000", fontWeight: 700, fontSize: "0.95rem" }}>
                    個性化學習進程
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Button variant="contained" size="large" sx={{ 
                  px: 5, py: 2, borderRadius: "14px", bgcolor: "#000000", color: "#FFFFFF", fontWeight: 700, textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  '&:hover': { bgcolor: '#222222', transform: "translateY(-2px)" }
                }}>
                  探索平台 🚀
                </Button>
                <Button variant="contained" size="large" onClick={handleLogin} sx={{ 
                  px: 5, py: 2, borderRadius: "14px", bgcolor: "#2196f3", color: "white", fontWeight: 700, textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 20px rgba(33,150,243,0.2)",
                  '&:hover': { bgcolor: '#1976d2', transform: "translateY(-2px)" }
                }}>
                  聯絡我們 🎓
                </Button>
              </Box>
              <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 3 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>支援科目:</Typography>
                {["英文", "中文", "數學", "歷史"].map((subject) => (
                  <Box key={subject} sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "rgba(0,0,0,0.03)", px: 1.5, py: 0.5, borderRadius: 2 }}>
                    <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{subject}</Typography>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 4, width: "100%", maxWidth: { xs: "100%", sm: 560 }, borderRadius: 4, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid #EEE" }}>
                <Box
                  component="iframe"
                  sx={{ width: "100%", aspectRatio: "16/9", border: "none", display: "block" }}
                  src="https://www.youtube.com/embed/_75n1GeAUsQ"
                  title="LeoEd Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ 
                  width: "100%", 
                  aspectRatio: "1/1",
                  bgcolor: "#f8f9fa", 
                  borderRadius: "32px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  border: "8px solid #FFFFFF",
                  overflow: "hidden"
                }}>
                   <Box sx={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlayArrowIcon sx={{ fontSize: 100, color: "rgba(0,0,0,0.1)" }} />
                   </Box>
                </Box>
                <Card sx={{ 
                  position: "absolute", 
                  top: -30, 
                  right: -20, 
                  p: 2, 
                  borderRadius: 3, 
                  boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                  border: "none"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                     <Box sx={{ width: 44, height: 44, bgcolor: "#E3F2FD", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏫</Box>
                     <Box>
                       <Typography variant="body2" sx={{ fontWeight: 800 }}>190+ 所香港學校</Typography>
                       <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>正在使用 LeoEd</Typography>
                     </Box>
                  </Box>
                </Card>
                <Card sx={{ 
                  position: "absolute", 
                  bottom: 20, 
                  left: -30, 
                  p: 2, 
                  borderRadius: 3, 
                  boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                  border: "none",
                  display: { xs: "none", sm: "block" }
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                     <Box sx={{ width: 44, height: 44, bgcolor: "#E8F5E9", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>⚡</Box>
                     <Typography variant="body2" sx={{ fontWeight: 800 }}>批改效率提升 80%</Typography>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* LEO Philosophy Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>CORE PHILOSOPHY</Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1 }}>學習、進化、優化 (Learn, Evolve, Optimize)</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 700, mx: "auto", fontSize: "1.2rem", lineHeight: 1.8 }}>
              LeoEd AI 不僅僅是一個靜態的內容庫。我們是一個以 AI 驅動的教育系統，旨在成為可靠的引航者，引領學生完成複雜的學習旅程。
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { icon: <FastIcon />, title: "學習 (Learn)", desc: "透過高度個性化的內容和積極參與，讓學生掌握新概念。" },
              { icon: <ReliableIcon />, title: "進化 (Evolve)", desc: "系統會根據您的即時學習進度，動態調整任務、測驗難度和學習節奏。" },
              { icon: <UnlimitedIcon />, title: "優化 (Optimize)", desc: "系統不斷完善其推薦內容，填補學習漏洞並鞏固薄弱環節，助您實現真正的精通。" }
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={cardStyles}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>{feature.title}</Typography>
                  <Typography variant="body1" sx={{ color: "#4A4A4A", fontWeight: 500, lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Key Features Section */}
      <Box sx={sectionStyles}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>POWERFUL TOOLS</Typography>
            <Typography variant="h2" sx={titleStyles}>變革現代教育的 AI 強大工具</Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { title: "自適應測驗生成", desc: "享受為您量身定制的低風險、高頻率測驗。我們的主題優先級引擎會根據學生的掌握程度、近期錯誤率和遺忘風險，選擇最合適的問題並校準難度。" },
              { title: "智能 AI 批改", desc: "獲得的不僅僅是分數。我們的 AI 引擎會根據精確的評分準則評估答案，提供詳細的評語來解釋分數、指出缺失的步驟和概念上的誤解，並提供具體的改進建議。" },
              { title: "多模式答案提交", desc: "以最適合該學科的方式提交作業。學生可以直接在介面輸入文字、使用內置工具繪製圖形和圖表，或在紙上作答後用流動裝置拍照上傳。" },
              { title: "持續反饋循環", desc: "評估結果會直接塑造學生接下來的學習路徑。測驗結果會自動更新學生檔案，以推薦具針對性的複習影片，並調整未來的測驗組合。" }
            ].map((tool, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  border: "1px solid #EEE",
                  height: "100%",
                  bgcolor: idx % 2 === 0 ? "rgba(33,150,243,0.02)" : "transparent"
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>{tool.title}</Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>{tool.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Solutions & Pioneer Subjects Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>SOLUTIONS & PIONEER SUBJECTS</Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1 }}>專為核心學科與高風險考試打造</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 700, mx: "auto", fontSize: "1.1rem" }}>
              LeoEd AI 旨在透過分階段實施，支持不同學科領域的高質量教育。
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { 
                subject: "大學會計課程", 
                subtitle: "基於規則的 AI 批改", 
                color: "#1A1A1A", 
                bg: "rgba(0,0,0,0.02)",
                desc: "我們的首個試點項目採用基於規則的 AI 批改，針對程序性計算和結構化步驟，旨在支持符合專業認證標準的能力期望。"
              },
              { 
                subject: "HKDSE 數學科", 
                subtitle: "考試準備與主題精通", 
                color: "#2196f3", 
                bg: "rgba(33,150,243,0.04)",
                desc: "一個具規模的考試準備環境，旨在幫助香港高中生逐個主題建立精通度，並獲得針對其特定學習水平的反饋。"
              },
              { 
                subject: "未來擴展", 
                subtitle: "大規模考試市場支援", 
                color: "#EF6C00", 
                bg: "rgba(239,108,0,0.04)",
                desc: "經驗證的系統最終將擴展至支持高度結構化、大規模的考試市場，如內地的全國統一高考。"
              }
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ 
                  ...cardStyles, 
                  bgcolor: "#FFF", 
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: item.color, mb: 1 }}>{item.subject}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mb: 3 }}>{item.subtitle}</Typography>
                  <Typography variant="body1" sx={{ color: "#4A4A4A", lineHeight: 1.8, mb: 4 }}>
                    {item.desc}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Button fullWidth variant="contained" sx={{ 
                      bgcolor: item.color, color: "white", py: 1.5, borderRadius: 3, textTransform: "none", fontWeight: 700,
                      "&:hover": { bgcolor: item.color, opacity: 0.9 }, boxShadow: "none"
                    }}>
                      了解更多詳情
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Partners Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box component="span" sx={{ bgcolor: "rgba(33,150,243,0.1)", color: "#2196f3", px: 2.5, py: 0.8, borderRadius: 10, fontSize: "0.85rem", fontWeight: 800, mb: 3, display: "inline-block" }}>
              TRUSTED BY LEADERS
            </Box>
            <Typography variant="h2" sx={titleStyles}>我們的合作學校</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>服務全港 190+ 所學校，深獲教育界信任與肯定。</Typography>
          </Box>
          <Box sx={{ height: "200px", border: "1px dashed #EEE", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
             <Typography sx={{ color: "text.disabled", fontWeight: 600 }}>合作學校資訊更新中</Typography>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>PRICING REVOLUTION</Typography>
            <Typography variant="h2" sx={titleStyles}>透明、靈活的收費方案</Typography>
          </Box>
          <Box sx={{ height: "300px", border: "1px dashed #EEE", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
             <Typography sx={{ color: "text.disabled", fontWeight: 600 }}>價格方案調整中，敬請期待</Typography>
          </Box>
        </Container>
      </Box>

      {/* Educator & Institution Section */}
      {/* Educator & Institution Section */}
      <Box sx={sectionStyles}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>FOR EDUCATORS & INSTITUTIONS</Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1 }}>賦能教師，打造智慧校園</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 800, mx: "auto", fontSize: "1.1rem" }}>
              將教學從標準化的傳授模式，轉變為高度響應、以學生為中心的系統。
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { 
                title: "精細化數據洞察", 
                desc: "在微觀層面上追蹤學生表現，清晰掌握全班的學習差距。",
                icon: "📊",
                color: "#2196f3"
              },
              { 
                title: "節省寶貴時間", 
                desc: "減輕繁重的人工批改負擔。我們的 AI 能可靠地評估開放式題目和圖表答案，讓教育工作者能專注於高成效的教學和個性化支援。",
                icon: "⏰",
                color: "#4CAF50"
              },
              { 
                title: "數據驅動決策", 
                desc: "利用可操作的分析數據，在學生最需要時提供針對性的補救措施或替代解釋。",
                icon: "🎯",
                color: "#1A1A1A"
              }
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ 
                  p: 5, borderRadius: 6, bgcolor: "#FBFBFC", height: "100%", display: "flex", flexDirection: "column",
                  border: "1px solid #EEE", transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-5px)" }
                }}>
                  <Box sx={{ fontSize: "3rem", mb: 3 }}>{item.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>{item.title}</Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="h2" sx={titleStyles}>核心研發團隊</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>源自香港都會大學，深耕語音及自然語言處理技術。</Typography>
          </Box>
          <Grid container spacing={6} justifyContent="center">
            {[
              { name: "Prof. Helen MENG", title: "香港都會大學 講座教授", desc: "SpeechX 首席科學家", sub: "麻省理工學院 (B.S., M.S., Ph.D.)" },
              { name: "Prof. Xixin WU", title: "香港都會大學 助理教授", desc: "清華大學 (M.S.), 都大 (Ph.D.)" },
              { name: "Dr. Bruce LI", title: "SpeechX 執行長", desc: "香港都會大學 榮譽副研究員", sub: "都大 (Ph.D.)" }
            ].map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar sx={{ 
                    width: 160, height: 160, mx: "auto", mb: 4, bgcolor: "#FFF", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    border: "4px solid #FFF"
                  }}>
                    <PersonIcon sx={{ fontSize: 90, color: "#EEE" }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{member.name}</Typography>
                  <Typography variant="subtitle1" sx={{ color: "#2196f3", fontWeight: 700, mt: 1 }}>{member.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, fontWeight: 500 }}>{member.desc}</Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mt: 1 }}>{member.sub}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#FBFBFC", color: "#1A1A1A", pt: 15, pb: 10, borderTop: "1px solid #EEE" }}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box component="img" src={logo} sx={{ height: 32, mr: 1.5, borderRadius: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>LeoEd</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 4, lineHeight: 2, maxWidth: 300 }}>
                Smarter marking for teachers.<br/>Deeper learning for students.<br/>
                AI 賦能教學，讓教學不再負擔。
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[<LanguageIcon />, <LanguageIcon />].map((icon, i) => (
                  <IconButton key={i} sx={{ border: "1px solid #EEE", "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                    {icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 4, textTransform: "uppercase", letterSpacing: 1 }}>AI 專區</Typography>
              {["英文科 AI", "中文科 AI", "數學科 AI", "歷史科 AI"].map((item) => (
                <Typography key={item} variant="body2" sx={{ color: "text.secondary", mb: 2, cursor: "pointer", "&:hover": { color: "#000" } }}>{item}</Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 4, textTransform: "uppercase", letterSpacing: 1 }}>資源與連結</Typography>
              {["免費示範", "平台登入", "收費方案", "資助申請"].map((item) => (
                <Typography key={item} variant="body2" sx={{ color: "text.secondary", mb: 2, cursor: "pointer", "&:hover": { color: "#000" } }}>{item}</Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 4, textTransform: "uppercase", letterSpacing: 1 }}>聯繫我們</Typography>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <WhatsAppIcon sx={{ color: "#4CAF50" }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>(852) 5601 0992</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                   <EmailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                   <Typography variant="body2" sx={{ color: "text.secondary" }}>Hello@leoed.ai</Typography>
                </Box>
              </Box>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#000", color: "#FFF", py: 2, borderRadius: 3, fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#222" } }}>
                預約到校交流
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 8, borderColor: "#EEE" }} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
             <Typography variant="caption" sx={{ color: "text.disabled" }}>
               © 2026 LeoEd Limited. 保留所有權利。
             </Typography>
             <Box sx={{ display: "flex", gap: 4 }}>
               <Typography variant="caption" sx={{ color: "text.disabled", cursor: "pointer" }}>私隱政策</Typography>
               <Typography variant="caption" sx={{ color: "text.disabled", cursor: "pointer" }}>服務條款</Typography>
             </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
