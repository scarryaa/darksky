import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type CommonNavParams = {
    Home: undefined;
    Search: undefined;
    Settings: undefined;
    PostThread: { name: string; rkey: string };
};

export type AllNavigatorParams = CommonNavParams & {};

export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>;
export type MatchResult = { params: RouteParams };
export type Route = {
    match: (path: string) => MatchResult | undefined;
};
export type RouteParams = Record<string, string>;