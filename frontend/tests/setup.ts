import { ObservableQuery } from '@apollo/client';
import fetch from 'cross-fetch';

global.fetch = fetch;
ObservableQuery.prototype.refetch = jest.fn();
