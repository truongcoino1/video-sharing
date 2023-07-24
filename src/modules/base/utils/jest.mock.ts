jest.mock("next/navigation", () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
    usePathname: () => "/",
  }));