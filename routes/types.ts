import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export interface CommonNavParams {
  Home: undefined;
  Search: undefined;
  Settings: undefined;
  PostThread: { name: string; rkey: string };
  Profile: { name: string; };
}

export type AllNavigatorParams = CommonNavParams & {};
export type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>;
export interface MatchResult { params: RouteParams }
export interface Route {
  match: (path: string) => MatchResult | undefined;
}
export type RouteParams = Record<string, string>;
