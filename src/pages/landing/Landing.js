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
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import logo from "../../images/logo.jpeg";
import profFung from "../../images/prof_fung.jpg";
import profWilliam from "../../images/prof_william.jpg";
import drLam from "../../images/dr_lam.jpg";

// Mock icons for the features section if specific ones aren't available
const FastIcon = () => (
  <Box
    sx={{
      backgroundColor: "#F5F5F5",
      p: 1,
      borderRadius: "50%",
      display: "inline-flex",
    }}
  >
    <LightningIcon sx={{ color: "#000000" }} />
  </Box>
);
const ReliableIcon = () => (
  <Box
    sx={{
      backgroundColor: "#F5F5F5",
      p: 1,
      borderRadius: "50%",
      display: "inline-flex",
    }}
  >
    <TargetIcon sx={{ color: "#000000" }} />
  </Box>
);
const UnlimitedIcon = () => (
  <Box
    sx={{
      backgroundColor: "#F5F5F5",
      p: 1,
      borderRadius: "50%",
      display: "inline-flex",
    }}
  >
    <InfinityIcon sx={{ color: "#000000" }} />
  </Box>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleExplore = () => {
    // Navigate to platform exploration
  };

  const handleTrial = () => {
    // Navigate to trial signup
  };

  const handleLearnMore = (subject) => {
    // Learn more about subject
  };

  const handleBookAppointment = () => {
    // Book school visit appointment
  };

  const sectionStyles = {
    py: { xs: 4, md: 15 },
    px: { xs: 2, md: 0 },
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
      borderColor: "transparent",
    },
  };

  const titleStyles = {
    fontWeight: 800,
    mb: 2,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#FFFFFF",
        color: "#1A1A1A",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          color: "black",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", height: { xs: 70, md: 80 } }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src={logo}
                sx={{ height: 32, mr: 1.5, borderRadius: 1 }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 800,
                  color: "#000000",
                  letterSpacing: "-0.5px",
                }}
              >
                LeoEd
              </Typography>
              <Box sx={{ display: { xs: "none", lg: "flex" }, ml: 6 }}>
                {[
                  { text: "nav.home", path: "/" },
                  // { text: "nav.subjects", path: "/subjects" },
                  // { text: "nav.partners", path: "/partners" },
                  // { text: "nav.pricing", path: "/pricing" },
                  // { text: "nav.educators", path: "/educators" },
                  // { text: "nav.contact", path: "/contact" },
                  { text: "nav.subjects", path: "/" },
                  { text: "nav.partners", path: "/" },
                  { text: "nav.pricing", path: "/" },
                  { text: "nav.educators", path: "/" },
                  { text: "nav.contact", path: "/" },
                ].map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "text.secondary",
                      px: 2,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      textTransform: "none",
                      "&:hover": { color: "#000000" },
                    }}
                  >
                    {t(item.text)}{" "}
                    {item.text === "nav.subjects" && (
                      <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
                    )}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LanguageSwitcher />
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
                  "&:hover": {
                    bgcolor: "#1976d2",
                    boxShadow: "0 6px 20px rgba(33,150,243,0.23)",
                  },
                }}
              >
                {t("header.login")}
              </Button>
              <Button
                variant="contained"
                onClick={handleTrial}
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
                  "&:hover": { bgcolor: "#222222" },
                }}
              >
                {t("header.trial")}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 6, md: 15 },
          pb: { xs: 6, md: 20 },
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 70% 30%, rgba(33,150,243,0.05) 0%, rgba(255,255,255,0) 60%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="span"
                  sx={{
                    bgcolor: "rgba(0,0,0,0.05)",
                    color: "#000000",
                    px: 2,
                    py: 1,
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: "#4CAF50",
                      borderRadius: "50%",
                    }}
                  />
                  {t("hero.badge")}
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  ...titleStyles,
                  fontSize: { xs: "2rem", md: "3.75rem" },
                }}
              >
                {t("hero.title")}
                <br />
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(90deg, #000000 0%, #2196f3 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("hero.titleGradient")}
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                  fontSize: { xs: "0.95rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  maxWidth: "90%",
                }}
              >
                {t("hero.subtitle")}
              </Typography>
              <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    {t("hero.feature1")}
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    {t("hero.feature2")}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleExplore}
                  sx={{
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: "14px",
                    bgcolor: "#000000",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    "&:hover": {
                      bgcolor: "#222222",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {t("hero.explore")}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleLogin}
                  sx={{
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: "14px",
                    bgcolor: "#2196f3",
                    color: "white",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    boxShadow: "0 10px 20px rgba(33,150,243,0.2)",
                    "&:hover": {
                      bgcolor: "#1976d2",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {t("hero.contact")}
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.85rem" }}
                >
                  {t("hero.subjects")}
                </Typography>
                {Array.isArray(t("hero.subjectsList"))
                  ? t("hero.subjectsList").map((subject) => (
                      <Box
                        key={subject}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          bgcolor: "rgba(0,0,0,0.03)",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ color: "#4CAF50", fontSize: 14 }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem" }}>
                          {subject}
                        </Typography>
                      </Box>
                    ))
                  : null}
              </Box>

              <Box
                sx={{
                  mt: 3,
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 560 },
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  border: "1px solid #EEE",
                }}
              >
                <Box
                  component="iframe"
                  sx={{
                    width: "100%",
                    aspectRatio: "16/9",
                    border: "none",
                    display: "block",
                  }}
                  src="https://www.youtube.com/embed/_75n1GeAUsQ"
                  title="LeoEd Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    bgcolor: "#f8f9fa",
                    borderRadius: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                    border: "8px solid #FFFFFF",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PlayArrowIcon
                      sx={{ fontSize: 100, color: "rgba(0,0,0,0.1)" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* LEO Philosophy Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2, fontSize: "0.75rem" }}
            >
              {t("philosophy.label")}
            </Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("philosophy.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 700,
                mx: "auto",
                fontSize: { xs: "0.9rem", md: "1.2rem" },
                lineHeight: 1.8,
              }}
            >
              {t("philosophy.description")}
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {[
              {
                icon: <FastIcon />,
                title: t("philosophy.learn"),
                desc: t("philosophy.learnDesc"),
              },
              {
                icon: <ReliableIcon />,
                title: t("philosophy.evolve"),
                desc: t("philosophy.evolveDesc"),
              },
              {
                icon: <UnlimitedIcon />,
                title: t("philosophy.optimize"),
                desc: t("philosophy.optimizeDesc"),
              },
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={cardStyles}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#4A4A4A", fontWeight: 500, lineHeight: 1.6 }}
                  >
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
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2, fontSize: "0.75rem" }}
            >
              {t("features.label")}
            </Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("features.title")}
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {[
              {
                title: t("features.adaptiveQuiz"),
                desc: t("features.adaptiveQuizDesc"),
              },
              {
                title: t("features.aiGrading"),
                desc: t("features.aiGradingDesc"),
              },
              {
                title: t("features.multiModal"),
                desc: t("features.multiModalDesc"),
              },
              {
                title: t("features.feedbackLoop"),
                desc: t("features.feedbackLoopDesc"),
              },
            ].map((tool, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid #EEE",
                    height: "100%",
                    bgcolor:
                      idx % 2 === 0 ? "rgba(33,150,243,0.02)" : "transparent",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", lineHeight: 1.8 }}
                  >
                    {tool.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Solutions & Pioneer Subjects Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2, fontSize: "0.75rem" }}
            >
              {t("solutions.label")}
            </Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("solutions.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 700,
                mx: "auto",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
              }}
            >
              {t("solutions.description")}
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {[
              {
                subject: t("solutions.accounting.subject"),
                subtitle: t("solutions.accounting.subtitle"),
                color: "#1A1A1A",
                bg: "rgba(0,0,0,0.02)",
                desc: t("solutions.accounting.desc"),
              },
              {
                subject: t("solutions.math.subject"),
                subtitle: t("solutions.math.subtitle"),
                color: "#2196f3",
                bg: "rgba(33,150,243,0.04)",
                desc: t("solutions.math.desc"),
              },
              {
                subject: t("solutions.future.subject"),
                subtitle: t("solutions.future.subtitle"),
                color: "#EF6C00",
                bg: "rgba(239,108,0,0.04)",
                desc: t("solutions.future.desc"),
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card
                  sx={{
                    ...cardStyles,
                    bgcolor: "#FFF",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: item.color, mb: 1 }}
                  >
                    {item.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "text.secondary", mb: 3 }}
                  >
                    {item.subtitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#4A4A4A", lineHeight: 1.8, mb: 4 }}
                  >
                    {item.desc}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleLearnMore(item.subject)}
                      sx={{
                        bgcolor: item.color,
                        color: "white",
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 700,
                        "&:hover": { bgcolor: item.color, opacity: 0.9 },
                        boxShadow: "none",
                      }}
                    >
                      {t("solutions.learnMore")}
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
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Box
              component="span"
              sx={{
                bgcolor: "rgba(33,150,243,0.1)",
                color: "#2196f3",
                px: 2.5,
                py: 0.8,
                borderRadius: 10,
                fontSize: "0.85rem",
                fontWeight: 800,
                mb: 3,
                display: "inline-block",
              }}
            >
              {t("partners.label")}
            </Box>
            <Typography variant="h2" sx={{ ...titleStyles, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("partners.title")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "0.85rem", md: "1rem" } }}>
              {t("partners.description")}
            </Typography>
          </Box>
          <Box
            sx={{
              height: { xs: "120px", md: "200px" },
              border: "1px dashed #EEE",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "text.disabled", fontWeight: 600, fontSize: { xs: "0.85rem", md: "1rem" } }}>
              {t("partners.updating")}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2, fontSize: "0.75rem" }}
            >
              {t("pricing.label")}
            </Typography>
            <Typography variant="h2" sx={{ ...titleStyles, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("pricing.title")}
            </Typography>
          </Box>
          <Box
            sx={{
              height: { xs: "180px", md: "300px" },
              border: "1px dashed #EEE",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "text.disabled", fontWeight: 600, fontSize: { xs: "0.85rem", md: "1rem" } }}>
              {t("pricing.updating")}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Educator & Institution Section */}
      <Box sx={sectionStyles}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ color: "#2196f3", fontWeight: 800, letterSpacing: 2, fontSize: "0.75rem" }}
            >
              {t("educators.label")}
            </Typography>
            <Typography variant="h2" sx={{ ...titleStyles, mt: 1, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("educators.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
              }}
            >
              {t("educators.description")}
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {[
              {
                title: t("educators.insights"),
                desc: t("educators.insightsDesc"),
                icon: "📊",
                color: "#2196f3",
              },
              {
                title: t("educators.timeSaving"),
                desc: t("educators.timeSavingDesc"),
                icon: "⏰",
                color: "#4CAF50",
              },
              {
                title: t("educators.dataDriven"),
                desc: t("educators.dataDrivenDesc"),
                icon: "🎯",
                color: "#1A1A1A",
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box
                  sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 6,
                    bgcolor: "#FBFBFC",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #EEE",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box sx={{ fontSize: { xs: "2.5rem", md: "3rem" }, mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: "1.1rem", md: "1.5rem" } }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: { xs: "0.85rem", md: "1rem" } }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FBFBFC" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography variant="h2" sx={{ ...titleStyles, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("team.title")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "0.85rem", md: "1rem" } }}>
              {t("team.description")}
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 3, md: 6 }} justifyContent="center">
            {[
              {
                name: "Dr. Lam Yat Ming Eddie (林一鳴)",
                title: t("team.institution"),
                desc: t("team.role"),
                sub: "",
                image: drLam,
              },
              {
                name: "Professor Fung Kwun Wing Joseph",
                title: t("team.institution"),
                desc: t("team.role"),
                sub: "",
                image: profFung,
              },
              {
                name: "Professor William YEOH Ging-sun",
                title: t("team.advisor"),
                desc: t("team.institution"),
                sub: "",
                image: profWilliam,
              },
            ].map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    src={member.image}
                    sx={{
                      width: { xs: 100, md: 160 },
                      height: { xs: 100, md: 160 },
                      mx: "auto",
                      mb: { xs: 2, md: 4 },
                      bgcolor: "#FFF",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      border: "4px solid #FFF",
                    }}
                  >
                    {!member.image && (
                      <PersonIcon sx={{ fontSize: { xs: 50, md: 90 }, color: "#EEE" }} />
                    )}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.25rem" } }}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#2196f3", fontWeight: 700, mt: 0.5, fontSize: { xs: "0.85rem", md: "1rem" } }}
                  >
                    {member.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 0.5, fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    {member.desc}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.disabled", display: "block", mt: 0.5, fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                  >
                    {member.sub}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "#FBFBFC",
          color: "#1A1A1A",
          pt: { xs: 8, md: 15 },
          pb: { xs: 6, md: 10 },
          borderTop: "1px solid #EEE",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 3, md: 4 } }}>
                <Box
                  component="img"
                  src={logo}
                  sx={{ height: 32, mr: 1.5, borderRadius: 1 }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, letterSpacing: -0.5, fontSize: { xs: "1.1rem", md: "1.25rem" } }}
                >
                  LeoEd
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: { xs: 3, md: 4 },
                  lineHeight: 2,
                  maxWidth: 300,
                  fontSize: { xs: "0.85rem", md: "0.875rem" },
                }}
                dangerouslySetInnerHTML={{ __html: t("footer.tagline") }}
              ></Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {[<FacebookIcon />, <InstagramIcon />, <LinkedInIcon />].map(
                  (icon, i) => (
                    <IconButton
                      key={i}
                      sx={{
                        border: "1px solid #EEE",
                        p: { xs: 0.5, md: 1 },
                        "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                      }}
                    >
                      {icon}
                    </IconButton>
                  ),
                )}
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 4 },
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {t("footer.aiSection")}
              </Typography>
              {Array.isArray(t("footer.aiLinks"))
                ? t("footer.aiLinks").map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: { xs: 1, md: 2 },
                        cursor: "pointer",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        "&:hover": { color: "#000" },
                      }}
                    >
                      {item}
                    </Typography>
                  ))
                : null}
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 4 },
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {t("footer.resources")}
              </Typography>
              {Array.isArray(t("footer.resourceLinks"))
                ? t("footer.resourceLinks").map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: { xs: 1, md: 2 },
                        cursor: "pointer",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        "&:hover": { color: "#000" },
                      }}
                    >
                      {item}
                    </Typography>
                  ))
                : null}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 4 },
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {t("footer.contact")}
              </Typography>
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 1.5, md: 2 } }}
                >
                  <WhatsAppIcon sx={{ color: "#4CAF50", fontSize: { xs: 18, md: 20 } }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.875rem" } }}>
                    {t("footer.phone")}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 1.5, md: 2 } }}
                >
                  <EmailIcon sx={{ color: "text.secondary", fontSize: { xs: 18, md: 20 } }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: { xs: "0.85rem", md: "0.875rem" } }}>
                    {t("footer.email")}
                  </Typography>
                </Box>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleBookAppointment}
                sx={{
                  bgcolor: "#000",
                  color: "#FFF",
                  py: { xs: 1.5, md: 2 },
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", md: "0.875rem" },
                  "&:hover": { bgcolor: "#222" },
                }}
              >
                {t("footer.appointment")}
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: { xs: 4, md: 8 }, borderColor: "#EEE" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography variant="caption" sx={{ color: "text.disabled", fontSize: { xs: "0.7rem", md: "0.75rem" } }}>
              {t("footer.copyright")}
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 2, md: 4 } }}>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", cursor: "pointer", fontSize: { xs: "0.7rem", md: "0.75rem" } }}
              >
                {t("footer.privacy")}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", cursor: "pointer", fontSize: { xs: "0.7rem", md: "0.75rem" } }}
              >
                {t("footer.terms")}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
