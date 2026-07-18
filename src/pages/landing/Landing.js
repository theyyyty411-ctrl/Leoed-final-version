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

// Mock icons for the features section if specific ones aren't available
const FastIcon = () => <Box sx={{ backgroundColor: '#EEEEEE', p: 1, borderRadius: '50%', display: 'inline-flex' }}><LightningIcon sx={{ color: '#757575' }} /></Box>;
const ReliableIcon = () => <Box sx={{ backgroundColor: '#E8F5E9', p: 1, borderRadius: '50%', display: 'inline-flex' }}><TargetIcon sx={{ color: '#4CAF50' }} /></Box>;
const UnlimitedIcon = () => <Box sx={{ backgroundColor: '#F3E5F5', p: 1, borderRadius: '50%', display: 'inline-flex' }}><InfinityIcon sx={{ color: '#9C27B0' }} /></Box>;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "white", color: "text.primary" }}>
      {/* Header */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "white", color: "black", borderBottom: "1px solid #eee" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#424242", display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ mr: 1 }}>🎓</Box> LingoTask
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}>
                {["首頁", "各科 AI", "合作學校", "收費方案", "智啟學教與eLAFP", "聯繫我們"].map((text) => (
                  <Button key={text} sx={{ color: "text.secondary", mx: 1, fontWeight: 500 }}>
                    {text} {text === "各科 AI" && <ExpandMoreIcon fontSize="small" />}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button startIcon={<LanguageIcon />} sx={{ color: "text.secondary", mr: 2, display: { xs: "none", sm: "flex" } }}>
                繁體
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleLogin}
                sx={{ mr: 2, textTransform: "none", borderRadius: 2, border: "1px solid #e0e0e0", color: "#424242" }}
              >
                學校師生登入
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ textTransform: "none", borderRadius: 2, boxShadow: "none" }}
              >
                立即免費試用
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ pt: 10, pb: 15, background: "linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography component="span" sx={{ bgcolor: "#EEEEEE", color: "#424242", px: 2, py: 0.5, borderRadius: 10, fontSize: "0.875rem", fontWeight: "bold" }}>
                  DSE • TSA • HKAT • IELTS 評核對標
                </Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                AI 極速批改<br />
                <Box component="span" sx={{ color: "#424242" }}>學習化繁為簡</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, fontSize: "1.1rem" }}>
                15 分鐘批改 100 份作文，服務全港 190+ 所中小學。一站式涵蓋中英文寫作批改、英粵普説話評測、數學步驟診斷及歷史資料題拆解，讓教師因材施教，引導學生自主學習。
              </Typography>
              <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#424242", fontWeight: "bold", borderBottom: "2px solid #424242" }}>
                  與香港中文大學聯合研發
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography sx={{ color: "#424242", fontWeight: "bold", borderBottom: "2px solid #424242" }}>
                  優質教育基金 (QEF eLAFP) 獲批方案
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 2, boxShadow: "none", textTransform: "none" }}>
                  立即免費試用 🚀
                </Button>
                <Button variant="outlined" size="large" onClick={handleLogin} sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: "none", bgcolor: "white" }}>
                  學校師生登入 🎓
                </Button>
              </Box>
              <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>支援科目:</Typography>
                {["英文科", "中文科", "普通話科", "數學科", "歷史科"].map((subject) => (
                  <Box key={subject} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 18 }} />
                    <Typography variant="body2">{subject}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <Box sx={{ 
                  width: "100%", 
                  maxWidth: 500, 
                  height: 350, 
                  bgcolor: "#EEEEEE", 
                  borderRadius: 4, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  position: "relative"
                }}>
                  <Box sx={{ width: "80%", height: "80%", bgcolor: "white", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                     <IconButton color="primary" sx={{ width: 80, height: 80, bgcolor: "rgba(66, 66, 66, 0.1)" }}>
                       <PlayArrowIcon sx={{ fontSize: 50, color: "#424242" }} />
                     </IconButton>
                  </Box>
                  <Card sx={{ position: "absolute", top: -20, right: -20, p: 2, borderRadius: 2, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                       <Box sx={{ width: 40, height: 40, bgcolor: "#EEEEEE", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>🏆</Box>
                       <Box>
                         <Typography variant="caption" sx={{ color: "text.secondary" }}>備受信任</Typography>
                         <Typography variant="body2" sx={{ fontWeight: "bold" }}>190+ 間香港學校</Typography>
                       </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why LingoTask Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            為何選擇 LingoTask ?
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            緊貼 DSE、TSA、HKAT 及 IELTS 評核標準。
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 4, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <FastIcon />
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>快速高效</Typography>
              <List dense>
                {["1 分鐘批改一篇作文", "15 分鐘批改 100 篇", "手寫 OCR 掃描，紙本即時批改"].map((item) => (
                  <ListItem key={item} disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 4, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <ReliableIcon />
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>精準可靠</Typography>
              <List dense>
                {["英繁簡手寫 OCR 識別率高達 99%", "支援港式口音，語音識別率達 99%", "中英文寫作批改，與真人契合度達 90%"].map((item) => (
                  <ListItem key={item} disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 4, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <UnlimitedIcon />
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>無限次</Typography>
              <List dense>
                {["不限次數使用，成本固定可控", "全球適用，無地域限制", "支援全科全題型"].map((item) => (
                  <ListItem key={item} disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Ecosystem Section */}
      <Box sx={{ py: 15, bgcolor: "#F5F5F5" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              打造智慧校園生態系統
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              全面支援管理層、教師與學生的核心需求。
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", p: 4, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AnalyticsIcon sx={{ fontSize: 48, color: "#424242", mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>學校管理層</Typography>
                <List dense>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><Box sx={{ width: 16, height: 16, bgcolor: "#424242", borderRadius: "50%", opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}><Box sx={{ width: 8, height: 8, bgcolor: "#424242", borderRadius: "50%" }} /></Box></ListItemIcon>
                    <ListItemText primary="提供學習分析報告，全面監測全科進度。" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><Box sx={{ width: 16, height: 16, bgcolor: "#424242", borderRadius: "50%", opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}><Box sx={{ width: 8, height: 8, bgcolor: "#424242", borderRadius: "50%" }} /></Box></ListItemIcon>
                    <ListItemText primary="固定成本，無限次批改。" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", p: 4, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PersonIcon sx={{ fontSize: 48, color: "#4CAF50", mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>教師團隊</Typography>
                <List dense>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><Box sx={{ width: 16, height: 16, bgcolor: "#4CAF50", borderRadius: "50%", opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}><Box sx={{ width: 8, height: 8, bgcolor: "#4CAF50", borderRadius: "50%" }} /></Box></ListItemIcon>
                    <ListItemText primary="大幅節省批改時間，15 分鐘處理 100 份試卷。" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><Box sx={{ width: 16, height: 16, bgcolor: "#4CAF50", borderRadius: "50%", opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}><Box sx={{ width: 8, height: 8, bgcolor: "#4CAF50", borderRadius: "50%" }} /></Box></ListItemIcon>
                    <ListItemText primary="學習數據一目了然，精準掌握班級進度。" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", p: 4, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SchoolIcon sx={{ fontSize: 48, color: "#9C27B0", mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>學生個人</Typography>
                <List dense>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><Box sx={{ width: 16, height: 16, bgcolor: "#9C27B0", borderRadius: "50%", opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}><Box sx={{ width: 8, height: 8, bgcolor: "#9C27B0", borderRadius: "50%" }} /></Box></ListItemIcon>
                    <ListItemText primary="適配學生水平，提供漸進或典範模式。" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}><Box sx={{ width: 16, height: 16, bgcolor: "#9C27B0", borderRadius: "50%", opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}><Box sx={{ width: 8, height: 8, bgcolor: "#9C27B0", borderRadius: "50%" }} /></Box></ListItemIcon>
                    <ListItemText primary="自主學習 (SRL) 的理想配套工具。" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* AI Subjects Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", p: 4, borderRadius: 4, position: "relative" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>英文科 AI</Typography>
              <Typography variant="body2" sx={{ color: "#424242", mb: 3 }}>智能學與教：寫作批改與聽說評測</Typography>
              <List dense>
                {[
                  "考評對標：支援 DSE、TSA、HKAT、IELTS 及校本標準。",
                  "寫作批改：OCR 精準識別手寫內容；提供焦點文法改正、詞句升級建議、標準評語及個人化範文。",
                  "說話評測：支援朗讀、看圖說話、個人短講、場景對話及小組討論等 DSE/TSA 題型。",
                  "閱讀及聆聽：支援 PDF、網頁、YouTube 及影音檔案，一鍵自動出題、批改與分析。"
                ].map((item) => (
                  <ListItem key={item} disableGutters sx={{ alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><CheckCircleIcon sx={{ color: "#424242", fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#EEEEEE", color: "#424242", py: 1.5, "&:hover": { bgcolor: "#E0E0E0" }, boxShadow: "none", textTransform: "none" }} endIcon={<ArrowForwardIcon />}>
                  探索英文方案
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
             <Card sx={{ height: "100%", p: 4, borderRadius: 4, border: "2px solid #4CAF50" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>中文科 AI</Typography>
              <Typography variant="body2" sx={{ color: "#4CAF50", mb: 3 }}>以評促學：寫作自動批改與粵普聽說評測</Typography>
              <List dense>
                {[
                  "考評標準：對標 DSE、TSA、HKAT 及校本標準。",
                  "寫作批改：精準識別繁簡手寫字；涵蓋命題作文與實用文，生成高層次引導性評語，啟發自主優化。",
                  "說話評測：支援粵普雙語，涵蓋看圖說話、個人短講及小組討論等口試題型評測。",
                  "閱讀及聆聽：涵蓋文言與白話文理解；支援普粵影音一鍵自動出題、批改及數據分析。"
                ].map((item) => (
                  <ListItem key={item} disableGutters sx={{ alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#E8F5E9", color: "#4CAF50", py: 1.5, mb: 1, "&:hover": { bgcolor: "#C8E6C9" }, boxShadow: "none", textTransform: "none" }} endIcon={<ArrowForwardIcon />}>
                  探索中文方案
                </Button>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#FFF3E0", color: "#EF6C00", py: 1.5, "&:hover": { bgcolor: "#FFE0B2" }, boxShadow: "none", textTransform: "none" }} endIcon={<ArrowForwardIcon />}>
                  探索普通話方案
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", p: 4, borderRadius: 4 }}>
              <Box sx={{ position: "absolute", top: 10, right: 10, bgcolor: "#EEEEEE", color: "#424242", px: 1, py: 0.2, borderRadius: 1, fontSize: "0.7rem", fontWeight: "bold" }}>
                下月發佈
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>數學科 AI</Typography>
              <Typography variant="body2" sx={{ color: "#424242", mb: 3 }}>算式步驟診斷：錯題追蹤與自適應練習</Typography>
              <List dense>
                {[
                  "圖像識別：支援手機拍照，具備手寫算式 OCR 識別技術。",
                  "步驟診斷：追蹤完整解題邏輯，精準指出步驟錯誤。",
                  "數據統計：即時統計班級答題表現與錯題分佈，大幅節省卷時間。",
                  "自主學習：推薦個人化弱項鞏固練習，落實自適應學與教。"
                ].map((item) => (
                  <ListItem key={item} disableGutters sx={{ alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><CheckCircleIcon sx={{ color: "#424242", fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Button fullWidth variant="outlined" sx={{ py: 1.5, borderRadius: 2, textTransform: "none" }} endIcon={<ArrowForwardIcon />}>
                  查看數學預熱方案
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Partners Section */}
      <Box sx={{ py: 10, bgcolor: "white", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography component="div" sx={{ mb: 2 }}>
             <Box component="span" sx={{ bgcolor: "#EEEEEE", color: "#424242", px: 2, py: 0.5, borderRadius: 10, fontSize: "0.875rem", fontWeight: "bold" }}>
               ⭐ 獲 190+ 所學校採用
             </Box>
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>我們的合作學校</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 6 }}>服務全港學校，深獲教育界信任與肯定。</Typography>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 6 }}>
            {["新界西", "新界東", "九龍", "香港島"].map((region, index) => (
              <Button key={region} variant={index === 0 ? "contained" : "outlined"} sx={{ px: 4, borderRadius: 10, textTransform: "none", boxShadow: index === 0 ? "none" : "inherit" }}>
                {region}
              </Button>
            ))}
          </Box>
          
          <Grid container spacing={2}>
             {[
               "佛教善德英文中學", "天主教母佑會蕭明中學", "中華傳道會安柱中學", "荃灣公立何傳耀紀念中學", "屯門官立中學", "南屯門官立中學",
               "獅子會蔣翠琼中學", "元朗公立中學校友會鄧兆棠中學", "靈糧堂怡文中學", "恩平工商會李琳明中學", "香港管理專業協會羅桂祥中學", "伊利沙伯中學舊生會湯國華中學"
             ].map((school) => (
                <Grid item xs={6} md={3} key={school}>
                  <Typography variant="body2" sx={{ textAlign: "left", color: "text.secondary" }}>{school}</Typography>
                </Grid>
             ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Table Section */}
      <Box sx={{ py: 15, bgcolor: "#F5F5F5" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
            <Box sx={{ bgcolor: "white", p: 1, borderRadius: 10, display: "flex", gap: 1, boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
              <Button variant="contained" sx={{ borderRadius: 10, px: 6, boxShadow: "none" }}>英文科</Button>
              <Button variant="text" sx={{ borderRadius: 10, px: 6, color: "text.secondary" }}>中文科</Button>
            </Box>
          </Box>
          
          <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: "0 20px 50px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                  <TableCell></TableCell>
                  {["方案 A", "方案 B", "方案 C", "方案 D"].map((p) => (
                    <TableCell key={p} align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{p}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: "text.secondary" }}>年費 (HKD)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>29,500</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>49,500</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>49,500</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>49,500</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>半年費 (HKD)</TableCell>
                   <TableCell align="center">19,000</TableCell>
                   <TableCell align="center">32,000</TableCell>
                   <TableCell align="center">32,000</TableCell>
                   <TableCell align="center">32,000</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>適用科目</TableCell>
                   <TableCell align="center">英文科</TableCell>
                   <TableCell align="center">英文科及中文科</TableCell>
                   <TableCell align="center">英文科</TableCell>
                   <TableCell align="center">英文科及中文科 (專注口試)</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>教師帳號數量</TableCell>
                   <TableCell align="center">12</TableCell>
                   <TableCell align="center">25</TableCell>
                   <TableCell align="center">12</TableCell>
                   <TableCell align="center">12</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>學生帳號範圍</TableCell>
                   <TableCell align="center">3 個年級 或 12 個班級</TableCell>
                   <TableCell align="center">全校學生</TableCell>
                   <TableCell align="center">全校學生</TableCell>
                   <TableCell align="center">全校學生</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>寫作自動批改</TableCell>
                   <TableCell align="center">無限次</TableCell>
                   <TableCell align="center">無限次</TableCell>
                   <TableCell align="center">無限次</TableCell>
                   <TableCell align="center" sx={{ color: "error.main" }}>×</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>Ask AI (GPT/Gemini/DeepSeek)</TableCell>
                   <TableCell align="center">無限次</TableCell>
                   <TableCell align="center">無限次</TableCell>
                   <TableCell align="center">無限次</TableCell>
                   <TableCell align="center">無限次</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell sx={{ color: "text.secondary" }}>首次教師培訓</TableCell>
                   <TableCell align="center"><CheckCircleIcon sx={{ color: "#4CAF50" }} /></TableCell>
                   <TableCell align="center"><CheckCircleIcon sx={{ color: "#4CAF50" }} /></TableCell>
                   <TableCell align="center"><CheckCircleIcon sx={{ color: "#4CAF50" }} /></TableCell>
                   <TableCell align="center"><CheckCircleIcon sx={{ color: "#4CAF50" }} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Funding Support Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>雙軌資助支援，靈活對接學校採購</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, height: "100%", borderRadius: 4, bgcolor: "#F1FAFD", border: "1px solid #E1F5FE" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Box sx={{ width: 40, height: 40, bgcolor: "#E8F5E9", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>🛡️</Box>
                <Box sx={{ bgcolor: "#4CAF50", color: "white", px: 2, py: 0.5, borderRadius: 1, fontSize: "0.8rem" }}>受 QEF eLAFP 資助 (09/2025 - 08/2028)</Box>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>優質教育基金 eLAFP 綠色通道<br/>(100% 毋需報價)</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.8 }}>
                LingoTask 已通過 QEF 委員會審核，eLAFP 資助撥款已直接預存於學校的香港教育城 (EdCity) 採購員帳戶中。前線毋需繁瑣報價，即可直接在 EdCity 系統內申請撥核銷，流程最簡化，相當於 0 成本引進。
              </Typography>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#4CAF50", py: 1.5, textTransform: "none", boxShadow: "none" }} endIcon={<ArrowForwardIcon />}>
                立即核銷 eLAFP 資助
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, height: "100%", borderRadius: 4, bgcolor: "#F5F6FF", border: "1px solid #E8EAF6" }}>
               <Box sx={{ width: 40, height: 40, bgcolor: "#E3F2FD", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>💰</Box>
               <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>「智啟學教」計劃 AI 方案<br/>(全套合規報價支援)</Typography>
               <Typography variant="body2" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.8 }}>
                針對教育局 50 萬大額全科 AI 智能學與教資助，LingoTask 團隊為本港學校提供全套合規報價、計劃書草擬及行政採購配合，協助學校高效完成校內審批程序。
               </Typography>
               <Button fullWidth variant="contained" sx={{ bgcolor: "#424242", py: 1.5, textTransform: "none", boxShadow: "none" }} endIcon={<ArrowForwardIcon />}>
                了解「智啟學教」通告
               </Button>
               <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
                 <CheckCircleIcon sx={{ color: "#424242", fontSize: 20 }} />
                 <Typography variant="caption">推廣自主語文學習 (英語或普通話) 一筆過津貼</Typography>
               </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ py: 15, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>核心研發成員</Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: "Prof. Helen MENG", title: "香港中文大學 講座教授", desc: "SpeechX 首席科學家", sub: "麻省理工學院 (B.S., M.S., Ph.D.)" },
              { name: "Prof. Xixin WU", title: "香港中文大學 助理教授", desc: "清華大學 (M.S.), 香港中文大學 (Ph.D.)" },
              { name: "Dr. Bruce LI", title: "SpeechX 聯合創始人及行政總裁", desc: "香港中文大學 榮譽副研究員", sub: "浙江大學 (B.S.), 清華大學 (M.S.), 香港中文大學 (Ph.D.)" }
            ].map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar sx={{ width: 150, height: 150, mx: "auto", mb: 3, bgcolor: "#eee" }}>
                    <PersonIcon sx={{ fontSize: 80, color: "#ccc" }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>{member.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#424242", mt: 1 }}>{member.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#424242" }}>{member.desc}</Typography>
                  <Typography variant="caption" display="block" sx={{ color: "text.secondary", mt: 1 }}>{member.sub}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#0D1B2A", color: "white", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, display: "flex", alignItems: "center" }}>
                🎓 LingoTask
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 4, lineHeight: 1.8 }}>
                Smarter marking for teachers. Deeper learning for students.
                AI 賦能教學，讓批改無憂，讓學習簡單。
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton sx={{ color: "white", border: "1px solid rgba(255,255,255,0.2)" }}><VideoLibraryIcon /></IconButton>
                <IconButton sx={{ color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>f</IconButton>
              </Box>
              <Button variant="outlined" sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)", mt: 4, textTransform: "none" }} startIcon={<PhoneIcon />}>
                下載應用程式
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 3 }}>AI 學與教專區</Typography>
              {["英文科 AI", "中文科 AI", "普通話科 AI", "數學科 AI", "歷史科 AI"].map((item) => (
                <Typography key={item} variant="body2" sx={{ opacity: 0.7, mb: 2, cursor: "pointer" }}>{item}</Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 3 }}>快速連結</Typography>
              {["申請免費到校示範", "平台登入", "合作學校", "收費方案", "QEF-eLAFP 全額資助"].map((item) => (
                <Typography key={item} variant="body2" sx={{ opacity: 0.7, mb: 2, cursor: "pointer" }}>{item}</Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 3 }}>聯繫我們</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, bgcolor: "rgba(255,255,255,0.05)", p: 1, borderRadius: 2 }}>
                <WhatsAppIcon sx={{ color: "#4CAF50" }} />
                <Typography variant="body2">(852) 5601 0992</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <PhoneIcon sx={{ opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>(852) 3943 9594</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <EmailIcon sx={{ opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>Hello@lingotask.com</Typography>
              </Box>
              <Button variant="contained" fullWidth sx={{ bgcolor: "#424242", py: 1.5, mb: 4, textTransform: "none" }} startIcon={<LocationIcon />}>預約到校示範</Button>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ opacity: 0.5 }}>香港科學園辦公室</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>Unit 218, 2/F, Building 19W, HK Science Park, Shatin, N.T., HK</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.5 }}>香港中文大學辦公室</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>Rm 1142, Cheng Yu Tung Building, CUHK, Shatin, N.T., HK</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.1)" }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              © 2026 SpeechX Limited. 版權所有。LingoTask® 是 SpeechX Limited 旗下的 AI 學與教平台。 | 粵ICP備17014234號-6
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
