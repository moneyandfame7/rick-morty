import React from "react";
import { NavigationTypeEnum } from "../constants/api";
import { Button, Stack } from "@mui/material";
import { useQueryParams } from "../hooks/useQueryParams";
import { useNavigate } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface INavigationProps {
  prev: string | null | undefined;
  next: string | null | undefined;
  navigationType: NavigationTypeEnum;
  isLoading: boolean;
}
const Navigation = ({ prev, next, navigationType, isLoading }: INavigationProps) => {
  const queryPage = Number(useQueryParams().get("page"));
  const navigate = useNavigate();
  return (
    <Stack direction='row' gap={3} justifyContent='center'>
      <Button
        disabled={!prev || isLoading}
        onClick={() => {
          navigate(`/${navigationType}?page=${queryPage - 1}`);
        }}
        startIcon={<NavigateBeforeIcon />}
      >
        Previous
      </Button>
      <Button
        title='Next'
        disabled={!next || isLoading}
        onClick={() => {
          navigate(`/${navigationType}?page=${queryPage + 1}`);
        }}
        endIcon={<NavigateNextIcon />}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Navigation;
