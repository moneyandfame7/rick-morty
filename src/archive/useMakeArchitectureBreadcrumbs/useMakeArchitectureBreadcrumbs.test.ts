import { useMakeArchitectureBreadcrumbs } from "./useMakeArchitectureBreadcrumbs";
let mockLocationValue = {
  pathname: "/character",
  search: "?page=1",
  hash: "",
  state: null,
  key: "default",
};
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useLocation: () => mockLocationValue,
}));

describe("makeArchitectureBreadcrumbs", () => {
  beforeEach(() => {
    mockLocationValue = {
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: "default",
    };
  });

  it("for home page", () => {
    expect(useMakeArchitectureBreadcrumbs()).toEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
    ]);
  });

  it("for episodes page", () => {
    mockLocationValue = {
      pathname: "/episode",
      search: "?page=1",
      hash: "",
      state: null,
      key: "oql3zksz",
    };
    expect(useMakeArchitectureBreadcrumbs()).toStrictEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
      {
        id: 1,
        isActive: true,
        label: "Episodes",
        path: "/episode?page=1",
      },
    ]);
  });

  it("for characters page", () => {
    mockLocationValue = {
      pathname: "/character",
      search: "?page=1",
      hash: "",
      state: null,
      key: "ni69cjv6",
    };
    expect(useMakeArchitectureBreadcrumbs()).toStrictEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
      {
        id: 1,
        isActive: true,
        label: "Characters",
        path: "/character?page=1",
      },
    ]);
  });

  it("for favorite page", () => {
    mockLocationValue = {
      pathname: "/favorite",
      search: "",
      hash: "",
      state: null,
      key: "7bxwrc5d",
    };
    expect(useMakeArchitectureBreadcrumbs()).toStrictEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
      {
        id: 1,
        isActive: true,
        label: "Information page",
        path: "/favorite",
      },
    ]);
  });

  it("for other pages", () => {
    mockLocationValue = {
      pathname: "/asdfdsf/12341234",
      search: "",
      hash: "",
      state: null,
      key: "default",
    };
    expect(useMakeArchitectureBreadcrumbs()).toStrictEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
      {
        id: 1,
        isActive: false,
        label: "Information page",
        path: "/asdfdsf/12341234",
      },
    ]);
  });
});
