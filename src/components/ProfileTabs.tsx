import {  Tabs, Tab } from "@mui/material";

export default function ProfileTabs(){
    return (
        // value={value} onChange={handleChange}
    <Tabs  aria-label="disabled tabs example">
        <Tab label="Active" />
        <Tab label="Disabled" disabled />
        <Tab label="Active" />
      </Tabs>
    )}