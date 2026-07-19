import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, FormControl, Select, Box, useTheme } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitcher = ({ textColor }) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [currentLang, setCurrentLang] = useState(i18n.language || "zh-TW");

  useEffect(() => {
    setCurrentLang(i18n.language || "zh-TW");
  }, [i18n.language]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setCurrentLang(selectedLanguage);
  };

  const iconColor = textColor || theme.palette.text.primary;
  const textStyle = { color: iconColor };

  return (
    <FormControl size="small" variant="outlined">
      <Select
        value={currentLang}
        onChange={handleLanguageChange}
      sx={{
        minWidth: { xs: 60, md: 80 },
        height: { xs: 32, md: 36 },
        color: iconColor,
        fontSize: { xs: "0.75rem", md: "0.875rem" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: textColor
            ? "rgba(255, 255, 255, 0.5)"
            : theme.palette.divider,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: iconColor,
        },
        "& .MuiSelect-select": {
          py: 0.5,
          px: 1,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: { xs: "0.75rem", md: "0.875rem" },
        },
      }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LanguageIcon sx={{ fontSize: { xs: 16, md: 18 }, color: iconColor }} />
            <span style={{ ...textStyle, fontSize: "inherit" }}>
              {selected === "zh-TW" ? "繁體" : "EN"}
            </span>
          </Box>
        )}
      >
        <MenuItem value="zh-TW">繁體中文</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
