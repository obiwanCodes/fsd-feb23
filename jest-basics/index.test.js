const {
  add,
  divide,
  isAdult,
  arrCopy,
  removeSpecialChars,
  percentageCalc,
  fetchGithubUser,
  matchingStrings,
} = require("./index");

test("5 and 10 added together will give 15", () => {
  expect(add(5, 10)).toBe(15);
});

test("10 divided by 2 will give 5", () => {
  expect(divide(10, 2)).toBe(5);
});

test("Age 23 will give true", () => {
  expect(isAdult(23)).toBe(true);
});

test("Age 13 will give true", () => {
  expect(isAdult(13)).toBe(false);
});

test("Array copy check", () => {
  let arr = [5, 6, 7];
  expect(arrCopy(arr)).toEqual(arr);
});

test("Check rmeoveal of special chars", () => {
  expect(removeSpecialChars("aftab@$%akh^&an!d")).not.toMatch(/[$^&*()@£#!]/);
});

test("Check for correct percentage", () => {
  expect(percentageCalc(100, 200)).toBe(50);
});

test("Check for highest percentage", () => {
  try {
    percentageCalc(397, 200);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      "marks cannnot be greater than total or less than 0"
    );
  }
});

test("Check for lowest percentage", () => {
  try {
    percentageCalc(-97, 200);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      "marks cannnot be greater than total or less than 0"
    );
  }
});

test("give me data for mojombo", async () => {
  const mojombo = {
    login: "mojombo",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/mojombo",
    html_url: "https://github.com/mojombo",
    followers_url: "https://api.github.com/users/mojombo/followers",
    following_url:
      "https://api.github.com/users/mojombo/following{/other_user}",
    gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
    starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
    organizations_url: "https://api.github.com/users/mojombo/orgs",
    repos_url: "https://api.github.com/users/mojombo/repos",
    events_url: "https://api.github.com/users/mojombo/events{/privacy}",
    received_events_url: "https://api.github.com/users/mojombo/received_events",
    type: "User",
    site_admin: false,
    name: "Tom Preston-Werner",
    company: "@chatterbugapp, @redwoodjs, @preston-werner-ventures ",
    blog: "http://tom.preston-werner.com",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: "mojombo",
    public_repos: 65,
    public_gists: 62,
    followers: 23588,
    following: 11,
    created_at: "2007-10-20T05:24:19Z",
    updated_at: "2023-08-13T23:06:28Z",
  };
  expect(await fetchGithubUser("mojombo")).toEqual(mojombo);
});

test("give me data for undefined username", async () => {
  try {
    await fetchGithubUser();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("username cannot be blank");
  }
});

test("Check for correct percentage", () => {
  expect(matchingStrings(["ab", "ab", "abc"], ["ab", "abc", "bc"])).toEqual([
    2, 1, 0,
  ]);
});

test("Check for correct percentage", () => {
  expect(matchingStrings(["ab", "ab", "abc"], ["ab", "abc", "bc"])).toEqual([
    2, 1, 0,
  ]);
});
