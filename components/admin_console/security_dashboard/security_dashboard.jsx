// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {t} from 'utils/i18n';
import FormattedAdminHeader from "../../widgets/admin_console/formatted_admin_header";

export default class SecurityDashboard extends React.PureComponent {
    static propTypes = {
        isLicensed: PropTypes.bool.isRequired,
        statusList: PropTypes.object,
    };

    render() {
        let statusList = [
            {
                title: t('admin.security.dashboard.site_url_https.title'),
                title_default: 'Site URL uses HTTPS',
                text: t('admin.security.dashboard.site_url_https.text'),
                text_default: 'Recommend to run HTTPS to defend against onec rutrum id lorem in dapibus. Pellentesque ligula leo, imperdiet eu aliquet et, maximus ut magna,',
                current_value: "HTTPS",
                recommended_value: "HTTPS",
                status: "healthy",
            },
            {
                title: t('admin.security.dashboard.site_url_https.title'),
                title_default: 'TLS Minimum Level',
                text: t('admin.security.dashboard.site_url_https.text'),
                text_default: 'Recommend to run TLS on version 1.2 to defend against [...]. If reverse proxy is used, the status cannot be determined.',
                current_value: "-",
                recommended_value: "TLS 1.2",
                status: "unknown",
            },
            {
                title: t('admin.security.dashboard.site_url_https.title'),
                title_default: 'Enable Multifactor-Authentication',
                text: t('admin.security.dashboard.site_url_https.text'),
                text_default: 'Recommend to run HTTPS to defend against onec rutrum id lorem in dapibus. Pellentesque ligula leo, imperdiet eu aliquet et, maximus ut magna,',
                current_value: "Disabled",
                recommended_value: "Enabled",
                status: "unhealthy",
            },
            {
                title: t('admin.security.dashboard.site_url_https.title'),
                title_default: 'Enforce Multifactor-Authentication',
                text: t('admin.security.dashboard.site_url_https.text'),
                text_default: 'Recommend to run HTTPS to defend against onec rutrum id lorem in dapibus. Pellentesque ligula leo, imperdiet eu aliquet et, maximus ut magna,',
                current_value: "Off",
                recommended_value: "Enforced",
                status: "warning",
            },
            {
                title: t('admin.security.dashboard.site_url_https.title'),
                title_default: 'Password Complexity',
                text: t('admin.security.dashboard.site_url_https.text'),
                text_default: 'Enforce password complexity [...]',
                current_value: "Yes, with the following pattern: [A-z0-9]",
                recommended_value: "Yes, with the following pattern: [A-z0-9$_-]",
                status: "warning",
            },
        ];

        let states = {
            unhealthy: {
                title: t('admin.security.dashboard.unhealthy'),
                title_default: 'Unhealthy',
                entries: [],
            },
            warning: {
                title: t('admin.security.dashboard.warning'),
                title_default: 'Warning',
                entries: [],
            },
            unknown: {
                title: t('admin.security.dashboard.unknown'),
                title_default: 'Unknown / Dismissed',
                entries: [],
            },
            healthy: {
                title: t('admin.security.dashboard.healthy'),
                title_default: 'Healthy',
                entries: [],
            },
        };

        let CategoryList = [];
        let statusValues = Object.values(statusList);

        statusValues.forEach(function (status) {
            let icon;

            if (status.status === 'healthy') {
                icon = 'check';
            } else if (status.status === 'warning') {
                icon = 'info';
            } else if (status.status === 'unhealthy') {
                icon = 'times';
            } else {
                icon = 'question';
            }

            let dismissButton;

            if (status.status !== 'healthy') {
                dismissButton = <a className="security-dashboard--entry-dismiss save-button btn btn-warning">Dismiss</a>;
            }

            states[status.status].entries.push(
                <div className={'security-dashboard--entry row security-dashboard--status__' + status.status}>
                    <div className="security-dashboard__entry-status-icon col-sm-2 align-middle">
                        <i className={'fa fa-' + icon + '-circle fa-4x'} aria-hidden="true"></i>
                    </div>
                    <div className="col-sm-10">
                        <span className="security-dashboard--entry-title">{status.title_default}</span>
                        <p className="security-dashboard--entry-text">{status.text_default}</p>
                        <ul>
                            <li><strong>Recommended Value:</strong> {status.recommended_value}</li>
                            <li><strong>Current Value:</strong> {status.current_value}</li>
                        </ul>
                        {dismissButton}
                    </div>
                </div>
            );
        });

        Object.values(states).forEach(function(state) {
            CategoryList.push(
                <div className='security-dashboard--category'>
                    <div className="row">
                        <div className="security-dashboard--category-title col-sm-12">
                            <span>{state.title_default}</span>
                        </div>
                    </div>
                    {state.entries}
                </div>
            );
        });

        return (
            <div className='wrapper--fixed security_dashboard'>
                <FormattedAdminHeader
                    id='security.dashboard.title'
                    defaultMessage='Security Dashboard'
                />
                <div className='security-dashboard--category security-dashboard--overview'>
                    <div className="row">
                        <div className="security-dashboard--category-title col-sm-12">
                            <span>Status Types</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className={'security-dashboard--entry row security-dashboard--status__healthy'}>
                                <div className="security-dashboard__entry-status-icon col-sm-2 align-middle">
                                    <i className={'fa fa-check-circle fa-4x'} aria-hidden="true"></i>
                                </div>
                                <div className="col-sm-10">
                                    <span className="security-dashboard--entry-title">Healthy</span>
                                    <p className="security-dashboard--entry-text">Secure configuration is currently applied</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className={'security-dashboard--entry row security-dashboard--status__warning'}>
                                <div className="security-dashboard__entry-status-icon col-sm-2 align-middle">
                                    <i className={'fa fa-info-circle fa-4x'} aria-hidden="true"></i>
                                </div>
                                <div className="col-sm-10">
                                    <span className="security-dashboard--entry-title">Warning</span>
                                    <p className="security-dashboard--entry-text">Potential misconfiguration detected - See status description</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className={'security-dashboard--entry row security-dashboard--status__unhealthy'}>
                                <div className="security-dashboard__entry-status-icon col-sm-2 align-middle">
                                    <i className={'fa fa-times-circle fa-4x'} aria-hidden="true"></i>
                                </div>
                                <div className="col-sm-10">
                                    <span className="security-dashboard--entry-title">Unhealthy</span>
                                    <p className="security-dashboard--entry-text">Misconfiguration detected, leading to potential security issues - See status description</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className={'security-dashboard--entry row security-dashboard--status__unknown'}>
                                <div className="security-dashboard__entry-status-icon col-sm-2 align-middle">
                                    <i className={'fa fa-question-circle fa-4x'} aria-hidden="true"></i>
                                </div>
                                <div className="col-sm-10">
                                    <span className="security-dashboard--entry-title">Unknown / Dismissed</span>
                                    <p className="security-dashboard--entry-text">Status could not be detected or was manually dismissed by admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {CategoryList}
            </div>
        );
    }
}
