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
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Person as PersonIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
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
import alsDiagram from "../../images/als_diagram.png";
import leoCycle from "../../images/leo_cycle.png";

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
                  { text: "nav.subjects", path: "/" },
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
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={alsDiagram}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ALS Description Section */}
      <Box sx={{ ...sectionStyles, bgcolor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ ...titleStyles, mb: 2, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              {t("als.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                lineHeight: 1.8,
              }}
            >
              {t("als.description")}
            </Typography>
          </Box>
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
          <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: 4 }}>
            {[
              {
                title: t("philosophy.learn"),
                desc: t("philosophy.learnDesc"),
              },
              {
                title: t("philosophy.evolve"),
                desc: t("philosophy.evolveDesc"),
              },
              {
                title: t("philosophy.optimize"),
                desc: t("philosophy.optimizeDesc"),
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Box
              component="img"
              src={leoCycle}
              sx={{
                width: "100%",
                maxWidth: 800,
                height: "auto",
                borderRadius: "16px",
              }}
            />
          </Box>
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
                </Card>
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
            {[ t("team.member1"), t("team.member2"), t("team.member3") ].map((member, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    src={[drLam, profFung, profWilliam][idx]}
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
                    <PersonIcon sx={{ fontSize: { xs: 50, md: 90 }, color: "#EEE" }} />
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
                    sx={{ color: "text.secondary", mt: 0.5, fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, whiteSpace: "pre-line" }}
                  >
                    {member.role}
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
              >
                {t("footer.tagline")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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
                Contact
              </Typography>
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 1.5, md: 2 } }}
                >
                  <EmailIcon sx={{ color: "text.secondary", fontSize: { xs: 18, md: 20 } }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: { xs: "0.85rem", md: "0.875rem" } }}>
                    {t("footer.email")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: { xs: 4, md: 8 }, borderColor: "#EEE" }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "text.disabled", fontSize: { xs: "0.7rem", md: "0.75rem" } }}>
              © {new Date().getFullYear()} LeoEd. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
