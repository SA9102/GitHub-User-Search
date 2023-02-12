import Profile from "./components/Profile";
import { useState, useEffect } from "react";

import { Box, IconButton, Input, Text, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import "./App.css";

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [nameInput, setNameInput] = useState("");

  // Load this username when page loads.
  useEffect(() => {
    handleGetUsers("SA9102");
  }, [""]);

  // Use the GitHub REST API to search for users based on the input.
  const handleGetUsers = async (q) => {
    try {
    } catch (err) {}
    const url = `https://api.github.com/search/users?q=${q}`;

    // Fetch the response
    const response = await fetch(url);
    // We need to be able to access the body of the data, so we convert it to JSON.
    const data = await response.json();
    // Return the data
    return data;
  };

  const handleSearch = () => {
    if (nameInput.trim() === "") {
      setProfiles([]);
    } else {
      let profiles = [];
      // Call the Fetch API
      handleGetUsers(nameInput)
        .then((data) => {
          profiles = data.items.map((profile) => {
            return {
              id: profile.id,
              login: profile.login,
              image: profile.avatar_url,
              url: profile.html_url,
            };
          });
          setProfiles(profiles);
        })
        .catch((err) => console.log(`An error occured: ${err}`));
    }
  };

  const handleNameInput = (value) => {
    setNameInput(value);
  };

  return (
    <>
      <Box
        className="App"
        mx="auto"
        my={["2rem", "4rem"]}
        p="3rem"
        width={["20rem", "29rem", "46rem"]}
        bg="gray.200"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        gap="2rem"
      >
        <Text
          alignSelf="center"
          textAlign="center"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="bold"
          color="gray.700"
        >
          GitHub User Search
        </Text>
        <Box id="div-search" display="flex" justifyContent="center" gap={2}>
          <Input
            variant="filled"
            type="text"
            id="name-input"
            value={nameInput}
            placeholder="Search username"
            onChange={(e) => handleNameInput(e.target.value)}
          />
          <IconButton
            aria-label="Search profiles"
            colorScheme="teal"
            icon={<SearchIcon />}
            onClick={handleSearch}
          />
        </Box>

        <Box
          id="profile-container"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          ) : (
            <Text alignSelf="center" color="gray.700" fontStyle="italic">
              No results found.
            </Text>
          )}
        </Box>
      </Box>
      <Text textAlign="center" mb={["2rem", "4rem"]} fontSize="0.7rem">
        &copy; Shayan Ali{" "}
        <Link
          href="https://github.com/SA9102"
          target="_blank"
          textDecoration="underline"
        >
          (SA9102)
        </Link>
      </Text>
    </>
  );
}
