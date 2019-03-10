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
        let statusList = {
            connection: {
                title: t('admin.security.dashboard.connection'),
                title_default: 'Connection',
                entries: [
                    {
                        title: t('admin.security.dashboard.site_url_https.title'),
                        title_default: 'Site URL uses HTTPS',
                        text: t('admin.security.dashboard.site_url_https.text'),
                        text_default: 'Recommend to run HTTPS to defend against onec rutrum id lorem in dapibus. Pellentesque ligula leo, imperdiet eu aliquet et, maximus ut magna,',
                        current_value: "HTTPS",
                        recommended_value: "HTTPS",
                        status: "good",
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
                ],
            },
            authentication: {
                title: t('admin.security.dashboard.connection'),
                title_default: 'Authentication',
                entries: [
                    {
                        title: t('admin.security.dashboard.site_url_https.title'),
                        title_default: 'Enable Multifactor-Authentication',
                        text: t('admin.security.dashboard.site_url_https.text'),
                        text_default: 'Recommend to run HTTPS to defend against onec rutrum id lorem in dapibus. Pellentesque ligula leo, imperdiet eu aliquet et, maximus ut magna,',
                        current_value: "Off",
                        recommended_value: "Enforced",
                        status: "bad",
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
                ],
            },
        };

        let CategoryList = [];
        let statusValues = Object.values(statusList);

        statusValues.forEach(function (status) {
            let CategoryEntries = [];
            let entryValues = Object.values(status.entries);

            entryValues.forEach(function (entry) {

                let icon;

                if (entry.status === 'good') {
                    icon = 'check';
                } else if (entry.status === 'warning') {
                    icon = 'info';
                } else if (entry.status === 'bad') {
                    icon = 'times';
                } else {
                    icon = 'question';
                }

                CategoryEntries.push(
                    <div className={'security-dashboard--entry row security-dashboard--status__' + entry.status}>
                        <div className="security-dashboard__entry-status-icon col-sm-2 align-middle">
                            <i className={'fa fa-' + icon + '-circle fa-4x'} aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-10">
                            <span className="security-dashboard--entry-title">{entry.title_default}</span>
                            <p className="security-dashboard--entry-text">{entry.text_default}</p>
                            <ul>
                                <li><strong>Recommended Value:</strong> {entry.recommended_value}</li>
                                <li><strong>Current Value:</strong> {entry.current_value}</li>
                            </ul>
                        </div>
                    </div>
                );
            });

            CategoryList.push(
                <div className='security-dashboard--category'>
                    <div className="row">
                        <div className="security-dashboard--category-title col-sm-12">
                            <span>{status.title_default}</span>
                        </div>
                    </div>
                    {CategoryEntries}
                </div>
            );
        });

        return (
            <div className='wrapper--fixed security_dashboard'>
                <FormattedAdminHeader
                    id='security.dashboard.title'
                    defaultMessage='Security Dashboard'
                />
                <div className='security-dashboard--category'>
                    <div className="row">
                        <div className="security-dashboard--category-title col-sm-12">
                            <span>Overview</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className={'security-dashboard--entry col-sm-3 security-dashboard--status__good'}>
                            <div className="security-dashboard__entry-status-icon ">
                                <span className="security-dashboard--entry-title">Authentication</span>
                                <i className={'fa fa-check-circle fa-4x'} aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className={'security-dashboard--entry col-sm-3 security-dashboard--status__warning'}>
                            <div className="security-dashboard__entry-status-icon ">
                                <span className="security-dashboard--entry-title">Authentication</span>
                                <i className={'fa fa-info-circle fa-4x'} aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className={'security-dashboard--entry col-sm-3 security-dashboard--status__unknown'}>
                            <div className="security-dashboard__entry-status-icon">
                                <span className="security-dashboard--entry-title">Authentication</span>
                                <i className={'fa fa-question-circle fa-4x'} aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className={'security-dashboard--entry col-sm-3 security-dashboard--status__bad'}>
                            <div className="security-dashboard__entry-status-icon">
                                <span className="security-dashboard--entry-title">Authentication</span>
                                <i className={'fa fa-times-circle fa-4x'} aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {CategoryList}
            </div>
        );
    }
}
