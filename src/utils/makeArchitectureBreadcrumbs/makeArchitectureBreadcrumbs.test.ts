import makeArchitectureBreadcrumbs from "./makeArchitectureBreadcrumbs";

describe("makeArchitectureBreadcrumbs", () => {
  const characterLocation = {
    pathname: "/character/1",
  };
  const episodeLocation = {
    pathname: "/episode/1",
  };
  const otherLocation = {
    pathname: "/asdfdsf/12341234",
  };
  const homeLocation = {
    pathname: "/",
  };

  it("for home page", () => {
    expect(makeArchitectureBreadcrumbs(homeLocation)).toEqual(
      expect.arrayContaining([
        {
          id: 0,
          isActive: false,
          label: "Home",
          path: "/",
        },
      ])
    );
  });

  it("for episode page", () => {
    expect(makeArchitectureBreadcrumbs(episodeLocation)).toStrictEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
      {
        id: 1,
        isActive: false,
        label: "Episodes",
        path: "/episode?page=1",
      },
      {
        id: 2,
        isActive: true,
        label: "Information page",
        path: "/episode/1",
      },
    ]);
  });

  it("for character page", () => {
    expect(makeArchitectureBreadcrumbs(characterLocation)).toStrictEqual([
      {
        id: 0,
        isActive: false,
        label: "Home",
        path: "/",
      },
      {
        id: 1,
        isActive: false,
        label: "Characters",
        path: "/character?page=1",
      },
      {
        id: 2,
        isActive: true,
        label: "Information page",
        path: "/character/1",
      },
    ]);
  });

  it("for other pages", () => {
    expect(makeArchitectureBreadcrumbs(otherLocation)).toStrictEqual([
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
