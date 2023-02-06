import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdHome, MdMenu } from "react-icons/md";
import type { LinksFunction, LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";
import stylesUrl from "../styles/index.css";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Project from "~/component/Project";
import { Logo } from "~/component/Logo";
import { fetchRepos, RepoResponse } from "~/external/GitHub";

// noinspection JSUnusedGlobalSymbols
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: stylesUrl,
  },
];

interface RepoFetchConfig {
  id: string;
  name: string;
  description: string;
}

interface RepoData {
  config: RepoFetchConfig;
  response: RepoResponse[];
}

interface LoaderData {
  repos: RepoData[];
}

const repoConfigs: RepoFetchConfig[] = [
  {
    id: "Woodworker4303",
    name: "Woodworker4303",
    description:
      "Our in-house solutions for smaller, more streamlined projectsabc.",
  },
];

export const loader: LoaderFunction = async () => {
  const repos: RepoData[] = [];
  for (const config of repoConfigs) {
    repos.push({
      config,
      response: await fetchRepos(config.id),
    });
  }

  return {
    repos,
  };
};

const projectColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <main className="content">
        <Box bg="linear-gradient(0deg, rgba(24,24,24,1) 0%, rgba(24,24,24,0) 75%), url(/assets/banner-bg.webp)">
          <Flex p="6" justifyContent="space-between">
            <Logo h={10} spin={true} />
            <Menu>
              <MenuButton as={IconButton} icon={<MdMenu />} aria-label="Menu" />
              <MenuList>
                <MenuItem icon={<MdHome />}>
                  <Link to="/">Home</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Box p="12" pt="4">
            <Center justifyContent={{ lg: "center", md: "start" }} pb="5px">
              <Heading fontSize="5xl">Hey, we&apos;re Zeriteabc.</Heading>
            </Center>
            <Center justifyContent={{ lg: "center", md: "start" }}>
              <Text fontSize="m" textColor="gray.600">
                A team of passionate developers, innovating in the gaming space.
              </Text>
            </Center>
            <Center justifyContent={{ lg: "center", md: "start" }}>
              <HStack pt="4" gap="4">
                <a
                  href="https://github.com/Zerite"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size="25" />
                </a>
                <a
                  href="https://twitter.com/ZeriteDev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter size="25" />
                </a>
              </HStack>
            </Center>
          </Box>
        </Box>
        <Box px={{ base: 12, lg: 24 }} py="12">
          <VStack gap={8} pt={4}>
            {data.repos.map((repos) => (
              <Box key={repos.config.id}>
                <Heading fontSize="xl">{repos.config.name}</Heading>
                <Text color="gray.600">{repos.config.description}</Text>
                <SimpleGrid
                  pt={4}
                  columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                  spacing={4}
                >
                  {repos.response.map((value, index) => (
                    <Project
                      key={value.name}
                      name={value.name}
                      description={value.description}
                      link={value.html_url}
                      stars={value.stargazers_count}
                      forks={value.forks_count}
                      language={value.language}
                      color={projectColors[index % projectColors.length]}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </VStack>
        </Box>
      </main>
      <Box as="footer" py="12" px={{ base: "4", md: "8" }} bg="gray.900">
        <Stack>
          <Text as="b" alignSelf={{ base: "center", sm: "start" }}>
            Zeriteabc Development
          </Text>
          <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </Text>
        </Stack>
      </Box>
    </>
  );
}
