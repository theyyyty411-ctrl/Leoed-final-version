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
                AI 極速批改<br />
                <Box component="span" sx={{ 
                  background: "linear-gradient(90deg, #000000 0%, #2196f3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>學習化繁為簡</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "90%" }}>
                15 分鐘批改 100 份作文。一站式涵蓋中英文寫作、說話評測、數學診斷及歷史拆解，讓教師專注因材施教。
              </Typography>
              <Box sx={{ mb: 6, display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#000000", fontWeight: 700, fontSize: "0.95rem" }}>
                    與香港中文大學聯合研發
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#000000", fontWeight: 700, fontSize: "0.95rem" }}>
                    QEF eLAFP 獲批方案
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
                  立即聯絡示範 🚀
                </Button>
                <Button variant="contained" size="large" onClick={handleLogin} sx={{ 
                  px: 5, py: 2, borderRadius: "14px", bgcolor: "#2196f3", color: "white", fontWeight: 700, textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 20px rgba(33,150,243,0.2)",
                  '&:hover': { bgcolor: '#1976d2', transform: "translateY(-2px)" }
                }}>
                  學校師生登入 🎓
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

      {/* Why LeoEd Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>CORE VALUES</Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1 }}>為何選擇 LeoEd ?</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", fontSize: "1.1rem" }}>
              專為香港教育體系設計，緊貼本地核心評核標準。
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { icon: <FastIcon />, title: "快速高效", items: ["1 分鐘批改一篇作文", "15 分鐘批改 100 份", "OCR 掃描，紙本即時批改"] },
              { icon: <ReliableIcon />, title: "精準可靠", items: ["OCR 識別率高達 99%", "支援港式口音識別", "AI 與真人評分契合度 90%+"] },
              { icon: <UnlimitedIcon />, title: "無限次使用", items: ["成本固定可控", "24/7 全天候支援", "支援全科多樣題型"] }
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={cardStyles}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>{feature.title}</Typography>
                  <List spacing={2}>
                    {feature.items.map((item) => (
                      <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} /></ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ fontWeight: 600, color: "#4A4A4A" }} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Ecosystem Section */}
      <Box sx={sectionStyles}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="h2" sx={titleStyles}>打造智慧校園生態系統</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 700, mx: "auto", fontSize: "1.1rem" }}>
              平衡管理層的數據洞察、教師的行政負擔與學生的個人化進度。
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { icon: <AnalyticsIcon />, title: "學校管理層", color: "#000", bg: "rgba(0,0,0,0.03)", items: ["全科進度監測", "大數據分析報告", "預算精確控制"] },
              { icon: <PersonIcon />, title: "教師團隊", color: "#2196f3", bg: "rgba(33,150,243,0.05)", items: ["解放批改壓力", "快速掌握弱項", "自動生成評語"] },
              { icon: <SchoolIcon />, title: "學生個人", color: "#9C27B0", bg: "rgba(156,39,176,0.05)", items: ["即時回饋學習", "自主提升動機", "自適應練習路徑"] }
            ].map((role, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ 
                  p: 6, 
                  borderRadius: 6, 
                  bgcolor: role.bg, 
                  height: "100%",
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <Box sx={{ 
                    width: 70, height: 70, bgcolor: "#FFF", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", mb: 4,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                  }}>
                    {React.cloneElement(role.icon, { sx: { fontSize: 32, color: role.color } })}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>{role.title}</Typography>
                  <List dense>
                    {role.items.map((text) => (
                      <ListItem key={text} disableGutters sx={{ justifyContent: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#4A4A4A" }}>{text}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AI Subjects Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>SOLUTIONS</Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1 }}>全科輔助 · 智能提效</Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { 
                subject: "英文科 AI", 
                subtitle: "智能學與教：寫作批改與聽說評測", 
                color: "#1A1A1A", 
                bg: "rgba(0,0,0,0.02)",
                features: [
                  "考評對標：支援 DSE、TSA、HKAT、IELTS 及校本標準。",
                  "寫作批改：OCR 精準識別手寫內容；提供文法改正、詞句升級及個人化範文。",
                  "說話評測：支援朗讀、看圖說話、個人短講及小組討論等題型。",
                  "自動出題：支援 PDF/YouTube 一鍵生成閱讀及聆聽練習。"
                ]
              },
              { 
                subject: "中文科 AI", 
                subtitle: "以評促學：寫作自動批改與粵普聽說評測", 
                color: "#4CAF50", 
                bg: "rgba(76,175,80,0.04)",
                secondaryColor: "#EF6C00",
                features: [
                  "考評標準：對標 DSE、TSA、HKAT 及校本標準。",
                  "寫作批改：精準識別繁簡手寫字；生成高層次引導性評語。",
                  "說話評測：支援粵普雙語口試評測。",
                  "文言白話：涵蓋理解及普粵影音出題分析。"
                ]
              },
              { 
                subject: "數學科 AI", 
                subtitle: "算式步驟診斷：錯題追蹤與自適應練習", 
                color: "#2196f3", 
                bg: "rgba(33,150,243,0.04)",
                badge: "下月發佈",
                features: [
                  "圖像識別：具備手寫算式 OCR 識別技術。",
                  "步驟診斷：追蹤解題邏輯，精準指出步驟錯誤。",
                  "數據統計：即時統計班級答題表現與錯題分佈。",
                  "自主學習：推薦個人化弱項鞏固練習。"
                ]
              }
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ 
                  ...cardStyles, 
                  bgcolor: "#FFF", 
                  position: "relative",
                  overflow: "hidden",
                  border: item.badge ? "2px solid #2196f3" : "1px solid #EEEEEE"
                }}>
                  {item.badge && (
                    <Box sx={{ 
                      position: "absolute", top: 15, right: -30, bgcolor: "#2196f3", color: "white", px: 4, py: 0.5, 
                      transform: "rotate(45deg)", fontSize: "0.7rem", fontWeight: 800 
                    }}>
                      {item.badge}
                    </Box>
                  )}
                  <Typography variant="h4" sx={{ fontWeight: 800, color: item.color, mb: 1 }}>{item.subject}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mb: 4 }}>{item.subtitle}</Typography>
                  <List spacing={1.5} sx={{ mb: 4 }}>
                    {item.features.map((f) => (
                      <ListItem key={f} disableGutters sx={{ alignItems: "flex-start", py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                          <CheckCircleIcon sx={{ color: item.color, fontSize: 18, opacity: 0.7 }} />
                        </ListItemIcon>
                        <ListItemText primary={f} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.5 }} />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: "auto" }}>
                    <Button fullWidth variant="contained" sx={{ 
                      bgcolor: item.color, color: "white", py: 1.5, borderRadius: 3, textTransform: "none", fontWeight: 700,
                      "&:hover": { bgcolor: item.color, opacity: 0.9 }, boxShadow: "none"
                    }}>
                      了解更多方案
                    </Button>
                    {item.secondaryColor && (
                      <Button fullWidth variant="outlined" sx={{ 
                        mt: 1.5, borderColor: item.secondaryColor, color: item.secondaryColor, py: 1.5, borderRadius: 3, textTransform: "none", fontWeight: 700,
                        "&:hover": { borderColor: item.secondaryColor, bgcolor: "rgba(239,108,0,0.04)" }
                      }}>
                        探索普通話方案
                      </Button>
                    )}
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
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 8, flexWrap: "wrap" }}>
            {["新界西", "新界東", "九龍", "香港島"].map((region, index) => (
              <Button key={region} variant={index === 0 ? "contained" : "outlined"} sx={{ 
                px: 4, py: 1, borderRadius: 10, textTransform: "none", fontWeight: 700,
                bgcolor: index === 0 ? "#000" : "transparent",
                color: index === 0 ? "#FFF" : "text.secondary",
                borderColor: index === 0 ? "#000" : "#EEE",
                "&:hover": { bgcolor: index === 0 ? "#222" : "rgba(0,0,0,0.02)", borderColor: "#CCC" }
              }}>
                {region}
              </Button>
            ))}
          </Box>
          
          <Grid container spacing={3}>
             {[
               "佛教善德英文中學", "天主教母佑會蕭明中學", "中華傳道會安柱中學", "荃灣公立何傳耀紀念中學", "屯門官立中學", "南屯門官立中學",
               "獅子會蔣翠琼中學", "元朗公立中學校友會鄧兆棠中學", "靈糧堂怡文中學", "恩平工商會李琳明中學", "香港管理專業協會羅桂祥中學", "伊利沙伯中學舊生會湯國華中學"
             ].map((school) => (
                <Grid item xs={6} md={3} key={school}>
                  <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #F5F5F5", "&:hover": { bgcolor: "#FBFBFC" } }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>{school}</Typography>
                  </Box>
                </Grid>
             ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section - Modernized */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="overline" sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2 }}>PRICING REVOLUTION</Typography>
            <Typography variant="h2" sx={titleStyles}>透明、靈活的收費方案</Typography>
            <Box sx={{ mt: 4, display: "inline-flex", p: 0.8, bgcolor: "#EEE", borderRadius: 4 }}>
              <Button variant="contained" sx={{ borderRadius: 3, px: 6, bgcolor: "#FFF", color: "#000", fontWeight: 700, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", "&:hover": { bgcolor: "#FFF" } }}>英文科</Button>
              <Button sx={{ borderRadius: 3, px: 6, color: "text.secondary", fontWeight: 700 }}>中文科</Button>
            </Box>
          </Box>
          
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 6, border: "1px solid #EEE", overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#FBFBFC" }}>
                  <TableCell sx={{ py: 4, borderRight: "1px solid #EEE" }}></TableCell>
                  {["方案 A", "方案 B", "方案 C", "方案 D"].map((p, idx) => (
                    <TableCell key={p} align="center" sx={{ py: 4, px: 3, borderRight: idx < 3 ? "1px solid #EEE" : "none" }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>{p}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { label: "年費 (HKD)", values: ["29,500", "49,500", "49,500", "49,500"], bold: true },
                  { label: "半年費 (HKD)", values: ["19,000", "32,000", "32,000", "32,000"] },
                  { label: "適用科目", values: ["英文", "英及中", "英文", "英及中 (口試)"] },
                  { label: "教師帳號", values: ["12", "25", "12", "12"] },
                  { label: "學生範圍", values: ["12 班", "全校", "全校", "全校"] },
                  { label: "自動批改", values: ["無限", "無限", "無限", "×"], x: 3 },
                  { label: "AI 助手", values: ["無限", "無限", "無限", "無限"] },
                  { label: "首次培訓", values: [true, true, true, true], icon: true }
                ].map((row, idx) => (
                  <TableRow key={idx} sx={{ "&:nth-of-type(even)": { bgcolor: "#FAFAFA" } }}>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", py: 2.5, borderRight: "1px solid #EEE" }}>{row.label}</TableCell>
                    {row.values.map((val, vIdx) => (
                      <TableCell key={vIdx} align="center" sx={{ borderRight: vIdx < 3 ? "1px solid #EEE" : "none" }}>
                        {row.icon ? (
                          <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                        ) : (
                          <Typography sx={{ 
                            fontWeight: row.bold ? 800 : 500, 
                            fontSize: row.bold ? "1.2rem" : "0.95rem",
                            color: (row.x === vIdx) ? "error.main" : "inherit"
                          }}>
                            {val}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Funding Support Section */}
      <Box sx={sectionStyles}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" sx={titleStyles}>雙軌資助支援，靈活對接學校採購</Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { 
                title: "優質教育基金 eLAFP 綠色通道", 
                subtitle: "(100% 毋需報價)", 
                desc: "LeoEd 已通過 QEF 委員會審核，eLAFP 資助撥款已直接預存於學校的 EdCity 帳戶中。流程極簡化，相當於 0 成本引進。",
                tag: "受 QEF eLAFP 資助",
                tagColor: "#4CAF50",
                btnColor: "#4CAF50",
                bg: "rgba(76,175,80,0.03)",
                icon: "🛡️"
              },
              { 
                title: "「智啟學教」計劃 AI 方案", 
                subtitle: "(全套合規報價支援)", 
                desc: "針對教育局 50 萬大額全科 AI 資助，我們提供全套合規報價、計劃書草擬及行政配合，協助高效率完成校內審批。",
                tag: "合規報價支援",
                tagColor: "#1A1A1A",
                btnColor: "#1A1A1A",
                bg: "rgba(0,0,0,0.03)",
                icon: "💰",
                extra: "推廣自主語文學習一筆過津貼"
              }
            ].map((card, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box sx={{ 
                  p: 6, borderRadius: 6, bgcolor: card.bg, height: "100%", display: "flex", flexDirection: "column",
                  border: `1px solid ${card.tagColor}15`
                }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "flex-start" }}>
                    <Box sx={{ fontSize: "2.5rem" }}>{card.icon}</Box>
                    <Typography sx={{ bgcolor: card.tagColor, color: "#FFF", px: 2, py: 0.5, borderRadius: 2, fontSize: "0.75rem", fontWeight: 800 }}>{card.tag}</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{card.title}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: card.tagColor, mb: 3 }}>{card.subtitle}</Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, lineHeight: 1.8 }}>{card.desc}</Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Button fullWidth variant="contained" sx={{ 
                      bgcolor: card.btnColor, color: "white", py: 2, borderRadius: 3, textTransform: "none", fontWeight: 700,
                      "&:hover": { bgcolor: card.btnColor, opacity: 0.9 }
                    }}>
                      了解詳細申請流程
                    </Button>
                    {card.extra && (
                      <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckCircleIcon sx={{ color: card.tagColor, fontSize: 18, opacity: 0.6 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>{card.extra}</Typography>
                      </Box>
                    )}
                  </Box>
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
            <Typography variant="body1" sx={{ color: "text.secondary" }}>源自香港中文大學，深耕語音及自然語言處理技術。</Typography>
          </Box>
          <Grid container spacing={6} justifyContent="center">
            {[
              { name: "Prof. Helen MENG", title: "香港中文大學 講座教授", desc: "SpeechX 首席科學家", sub: "麻省理工學院 (B.S., M.S., Ph.D.)" },
              { name: "Prof. Xixin WU", title: "香港中文大學 助理教授", desc: "清華大學 (M.S.), 中大 (Ph.D.)" },
              { name: "Dr. Bruce LI", title: "SpeechX 執行長", desc: "香港中文大學 榮譽副研究員", sub: "中大 (Ph.D.)" }
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
               © 2026 LeoEd. 版權所有。香港中文大學聯合研發項目。
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
