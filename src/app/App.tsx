import moment from 'moment';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  getLanguage,
  getTokenFromLocalStorage,
  getVariablesLC,
  saveLanguage,
} from './helpers/localStorage';
import RenderRoutes, { routes } from './routes/routes';
import './styles/variables.scss';
import './styles/animation.scss';
import './styles/base.scss';
import './styles/elements.scss';
import './styles/typography.scss';
import './styles/dependencies/index.scss';
import './styles/global.scss';
import { handleGetCurrentUser } from 'store/users/handleUser';
import 'sweetalert2/src/sweetalert2.scss';
import { RootState } from 'types/RootState';
import { setAuthenticated } from 'store/auth/authSlice';
import SuspenseFallback from './components/Common/SuspenseFallback/SuspenseFallback';
// Set locate to moment lib
const language = getLanguage();
saveLanguage(language);
moment.locale(language);

export function App() {
  const dispatch = useDispatch();
  // const { authenticated, currentUser, userRegister } = useSelector(
  //   (state: RootState) => state.auth,
  // );

  // const isAuthenticated = !!(authenticated && currentUser && Object.keys(currentUser).length);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(loadCommonData());
  //   }
  // }, [authenticated, currentUser, isAuthenticated, dispatch]);

  useEffect(() => {
    // Kiểm tra xem token xác thực có tồn tại không
    const isAuthenticated = getTokenFromLocalStorage() !== null;

    dispatch(setAuthenticated(isAuthenticated));

    // Cập nhật trạng thái xác thực trong Redux store
  }, [dispatch]);

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      dispatch(handleGetCurrentUser());
    }
  }, [getTokenFromLocalStorage()]);

  return (
    <Router basename="">
      <Suspense fallback={<SuspenseFallback />}>
        <RenderRoutes routes={routes} isAuthenticated={true} />
      </Suspense>
    </Router>
  );
}
