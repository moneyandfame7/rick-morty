import React, { FC } from "react";
import { useNavigate } from "react-router";
import { NavigationTypeEnum } from "../../constants/api";
import { useQueryParams } from "../../hooks/useQueryParams";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Button, Stack } from "@mui/material";

interface INavigationProps {
  prev: string | null | undefined;
  next: string | null | undefined;
  navigationType: NavigationTypeEnum;
  isLoading: boolean;
}
export const Navigation: FC<INavigationProps> = ({ prev, next, navigationType, isLoading }) => {
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