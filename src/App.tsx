import { useState } from "react";
import { AppBar, Container, ThemeProvider, Toolbar, Typography } from "@material-ui/core";

import PackagesList from "./components/PackagesList";
import PackageForm from "./components/PackageForm";

import { Insurer, IUser } from "./utils/types";
import { theme } from "./theme";

export const App: React.FunctionComponent = () => {
  const [insurer, setInsurer] = useState<Insurer | null>(null);

  const onSubmit = (data: IUser) => {
    fetch("http://www.example.com/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        insurer,
        ...data
      })
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography>Technical Assignment</Typography>
          </Toolbar>
        </AppBar>

        {/* TODO: Add components here */}
        <Container maxWidth="sm">
          {insurer ? (
            <PackageForm onBack={() => setInsurer(null)} onSubmit={onSubmit} />
          ) : (
            <PackagesList onSelect={setInsurer} />
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};
